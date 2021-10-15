import { WebSocketServer } from 'ws'
import Player from './models/Player';
import helpers from './helpers'
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 3000 })

let activeRooms = []
let timeOut

wss.on('connection', ws => {
  // Connection ID
  const connUUID = uuidv4()
  let init = true

  ws.on('message', data => {

    const [command, roomId, playerName] = helpers.getArgsFromBuffer(data)

    switch (command) {
      case 'create':
        let newRoomID = helpers.generateRandomId()
        activeRooms[newRoomID] = []
        ws.send(`created ${newRoomID}`)
        break

      case 'join':
        if (!isRoomValid(roomId)) {
          ws.send('ERROR room not found')
          return;
        }

        activeRooms[roomId][connUUID] = new Player(ws, playerName)
        refreshClients(roomId)
        break

      case 'ready':
        if (isRoomValid(roomId)) {
          activeRooms[roomId][connUUID].toggleReady()
          refreshClients(roomId)
        }
        break;

      case 'newname':
        if (isRoomValid(roomId)) {
          activeRooms[roomId][connUUID].setName(playerName)
          refreshClients(roomId)
        }
        break
      case 'pong':
        clearTimeout(timeOut)
        break
    }

    if (init && roomId) {
      init = false
      setInterval(() => {
        if (isRoomValid(roomId)) {
          ping(ws, roomId)
          refreshClients(roomId)
        }
      }, 3000)
    }
  })
})

const refreshClients = (roomId) => {
  const players = JSON.stringify(Object.values(activeRooms[roomId]).map(x => x.getClientData()))

  Object.values(activeRooms[roomId]).forEach(player => {
    player.socket.send(`refresh ${players}`)
  })
}

const isRoomValid = (roomId) => {
  return activeRooms[roomId]
}

function ping (ws, roomId) {
  ws.send('ping')

  timeOut = setTimeout(() => {
    activeRooms[roomId] = Object.values(activeRooms[roomId]).filter(p => p.getSocket() !== ws)

    if (!Object.values(activeRooms[roomId]).length) {
      delete activeRooms[roomId]
    }
  }, 3000)
}