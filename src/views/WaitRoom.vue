<template>
  <v-card class="mx-auto" max-width="800">
    <v-img src="@/assets/dices.jpg" height="200px"></v-img>
    <v-card-text class="text--primary">
      <h1>Room ID: {{ roomId }}</h1>

      <v-list class="transparent">
        <v-list-item>
          <v-text-field
            label="Votre nom"
            v-model="playerName"
            required
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <h2>Joueurs (max 4)</h2>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col v-for="p in players" :key="p.abrev">
              <v-avatar color="red">
                <span class="white--text text-h5">NC</span>
              </v-avatar>
              {{ p.name }} {{ p.ready }}
              <v-icon v-if="p.ready" color="green darken-2"
                >account-check</v-icon
              >
              <v-icon v-else color="red darken-2">close-thick</v-icon>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-list class="transparent">
      <v-list-item v-if="socketConnected">
        <v-btn :color="readyBtnColor" @click="toggleReady" block dark
          >Prêt(e)</v-btn
        >
      </v-list-item>
      <v-list-item v-if="isHost">
        <v-btn
          color="green darken-4"
          block
          :dark="canStartGame"
          :disabled="!canStartGame"
          >Lancer la partie</v-btn
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isReady: false,
    playerName: '',
    roomId: "",
    players: [],
    socket: null,
    socketConnected: false
  }),
  methods: {
    toggleReady () {
      this.socket.send(`ready ${this.roomId}`)
    },
    startGame () {

    },
  },
  computed: {
    canStartGame () { return this.playerName != '' && this.players.every(p => p.ready === true) },
    readyBtnColor () { return false ? 'green darken-4' : 'red' /* TODO: refactor this */ },
    isHost () { return this.$route.name === 'Waitroom' },
  },

  created () {
    this.playerName = 'Nicolas' // Temporary random name
    this.socket = new WebSocket('ws://localhost:3000')

    if (this.$route.params.roomid) {
      this.roomId = this.$route.params.roomid
      this.socket.onopen = () => this.socket.send(`join ${this.roomId} ${this.playerName}`)
    }
    else {
      this.socket.onopen = () => this.socket.send('create')
    }

    let state = this

    this.socket.onmessage = function (event) {
      const [command, arg] = event.data.split(' ')
      state.socketConnected = true

      switch (command) {
        case 'created':
          state.roomId = arg
          state.socket.send(`join ${state.roomId} ${state.playerName}`)
          break

        case 'joined':
        case 'refresh':
          state.players = JSON.parse(arg)
          break

        case 'ERROR':
          console.log(event.data)
          break

        default:
          console.log('Server sent an unexcepted message')
          break
      }
    }
  }
}
</script>