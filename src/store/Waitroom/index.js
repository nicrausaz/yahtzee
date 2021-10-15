const WaitRoomModule = {
   namespaced: true,
   state: () => ({
      roomId: "",
      playerName: "Timmy",
      isHost: false,
      connectedPlayers: [],
      socket: null,
      socketConnected: false
   }),

   mutations: {
      setRoomId (state, roomId) {
         state.roomId = roomId
      },
      setSocket (state, socket) {
         state.socket = socket
      },
      setReady (state, ready) {
         state.ready = ready
      },
      setHost (state, value) {
         state.isHost = value
      },
      setPlayerName (state, playerName) {
         state.playerName = playerName
      },
      setPlayers (state, players) {
         state.connectedPlayers = players
      }
   },

   getters: {
      socketConnected: (state) => {
         return state.socketConnected
      },
      allPlayersReady: (state) => {
         return state.connectedPlayers.every(p => p.ready === true)
      }
   },

   actions: {
      initSocket (context) {
         context.commit('setSocket', new WebSocket('ws://localhost:3000'))
      },
      setRoomId (context, roomId) {
         context.commit('setRoomId', roomId)
      },
      joinOrCreateRoom ({ commit, state }) {
         if (state.roomId) {
            state.socket.onopen = () => state.socket.send(`join ${state.roomId} ${state.playerName}`)
         }
         else {
            commit('setHost', true)
            state.socket.onopen = () => state.socket.send('create')
         }

         state.socket.onmessage = function (event) { performOnMessage(event, state, commit) }
      },
      toggleReady (context, ready) {
         context.commit('setReady', ready)
      }
   }
}

function performOnMessage (event, state, commit) {
   const [command, arg] = event.data.split(' ')
   state.socketConnected = true

   switch (command) {
      case 'created':
         commit('setRoomId', arg)
         state.socket.send(`join ${state.roomId} ${state.playerName}`)
         break

      case 'joined':
      case 'refresh':
         commit('setPlayers', JSON.parse(arg))
         break

      case 'ERROR':
         console.log(event.data)
         break

      case 'ping':
         state.socket.send('pong')
         break

      default:
         console.log('Server sent an unexcepted message')
         break
   }
}

export default WaitRoomModule