import { WebSocketServer } from 'ws'
import helpers from './helpers'
import Room from './models/Room'

const wss = new WebSocketServer({ port: 3000 })

let activeRooms = []

wss.on('connection', function connection (ws) {
  ws.on('message', function (message) {
    const args = helpers.getStringFromBuffer(message).split(' ')

    switch (args[0]) {
      case 'join':

        // Check if exists
        const room = activeRooms.find(x => x.id === args[1])

        if (room) {
          ws.send(`joined ${room.id}`)
        }
        else {
          ws.send('ERROR room not found')
        }
        break;

      case 'create':

        // Create
        let newRoom = new Room()
        activeRooms.push(newRoom)

        ws.send(`created ${newRoom.id}`)

        console.log("Existing rooms:", activeRooms)


        break;

      default:
        ws.send('ERROR invalid command')
        break;
    }
  })
})