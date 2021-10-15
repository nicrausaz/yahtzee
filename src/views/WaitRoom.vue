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
            @keyup.enter="updateName"
          >
            <template v-slot:append>
              <v-btn dark tile color="green darken-4" @click="updateName">
                Apply
              </v-btn>
            </template>
          </v-text-field>
        </v-list-item>
        <v-list-item>
          <h2>Joueurs (max 4)</h2>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col v-for="p in players" :key="p.abrev">
              <v-avatar :color="p.ready ? `green` : `red`">
                <span class="white--text text-h5">{{ p.abrev }}</span>
              </v-avatar>
              {{ p.name }}
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
    playerName: 'Didier',
    roomId: "",
    players: [],
    socket: null,
    socketConnected: false
  }),
  methods: {
    toggleReady () {
      this.isReady = !this.isReady
      this.socket.send(`ready ${this.roomId}`)
    },
    updateName () {
      this.socket.send(`newname ${this.roomId} ${this.playerName}`)
    },
    startGame () {

    },
  },
  computed: {
    canStartGame () { return this.playerName != '' && this.players.every(p => p.ready === true) },
    readyBtnColor () { return this.isReady ? 'green darken-4' : 'red' },
    isHost () { return this.$route.name === 'Waitroom' },
  },

  created () {
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
      
console.log(command, arg)

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