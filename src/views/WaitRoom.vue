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
                <span class="white--text text-h5">{{ p.abrev }}</span>
              </v-avatar>
              {{ p.name }}
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-list class="transparent">
      <v-list-item>
        <v-btn
          :color="readyBtnColor"
          @click="isReady = !isReady"
          block
          dark
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
    players: []
  }),
  methods: {
    startGame () {

    },
  },
  computed: {
    canStartGame () { return this.playerName != '' && this.players.length > 0 },
    readyBtnColor () { return this.isReady ? 'green darken-4' : 'red'},
    isHost () { return this.$route.name === 'Waitroom' }
  },

  created () {
    this.playerName = Math.random().toString(36).substr(2, 8) // Temporary random name
    const ws = new WebSocket('ws://localhost:3000')

    if (this.$route.params.roomid) {
      this.roomId = this.$route.params.roomid
      ws.onopen = () => ws.send(`join ${this.roomId} ${this.playerName}`)
    }
    else {
      ws.onopen = () => ws.send('create')
    }
    
    let state = this

    ws.onmessage = function (event) {
      const args = event.data.split(' ')
      const command = args[0]

      switch (command) {
        case 'created':
          state.roomId = args[1]
          ws.send(`join ${this.roomId} ${this.playerName}`)
          break;

        case 'joined':

          const data = JSON.parse(args[1])

          state.roomId = data.id
          state.players = data.players

          break;

        case 'ERROR':
          console.log(event.data)
          break;

        default:
          console.log('Server sent an unexcepted message')
          break;
      }
    }
  }
}
</script>