import { WebSocketServer } from 'ws'
import helpers from './helpers'
import Room from './models/Room'
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 3000 })

let activeRooms = []

wss.on('connection', ws => {
  // Connection ID
  const connUUID = uuidv4()

  ws.on('message', data => {

    const [command, roomId, player] = helpers.getArgsFromBuffer(data)

    switch (command) {
      case 'create':
        let newRoomID = helpers.generateRandomId()

        activeRooms[newRoomID] = []

        ws.send(`created ${newRoomID}`)
        break

      case 'join':

        if (!activeRooms[roomId]) {
          ws.send('ERROR room not found')
          return;
        }

        activeRooms[roomId][connUUID] = {
          player: {
            name: player,
            ready: false
          },
          socket: ws
        }

        refreshClients(roomId)
        break

      case 'ready':
        console.log(activeRooms[roomId][connUUID].player)
        if (activeRooms[roomId]) {
          activeRooms[roomId][connUUID].player.ready = !activeRooms[roomId][connUUID].player.ready
          refreshClients(roomId)
        }
        break;
    }

    //ws.onclose(() => delete)
  })
})

const refreshClients = (roomId) => {
  const players = JSON.stringify(Object.values(activeRooms[roomId]).map(x => x.player))

  Object.values(activeRooms[roomId]).forEach(player => {
    player.socket.send(`refresh ${players}`)
  })
}

const validateRoom = (roomId) => {
  // TODO
}