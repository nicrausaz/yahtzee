<template>
  <v-card class="mx-auto" max-width="800">
    <v-img src="@/assets/dices.jpg" height="200px"></v-img>
    <v-card-text class="text--primary">
      <h1>Créer une partie</h1>
      <v-list class="transparent">
        <v-list-item> Jouer avec vos amis (max 4) </v-list-item>
        <v-list-item>
          <v-text-field
            label="Votre nom"
            v-model="playerName"
            required
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <h2>Room ID: {{ roomId }}</h2>
          <p>send this to your friends</p>
        </v-list-item>
        <v-list-item>
          <h2>Joueurs</h2>
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
          color="green darken-4"
          @click="openPlayersDialog = true"
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
    isHost: true,
    playerName: 'Nicolas',
    roomId: "",
    players: []
  }),
  props: [],
  methods: {
    startGame () {

    },
  },
  computed: {
    canStartGame () { return this.playerName != '' && this.players.length > 0 }
  },

  created () {
    const ws = new WebSocket('ws://localhost:3000')

    if (this.$route.params.roomid) {
      this.roomId = this.$route.params.roomid
      ws.onopen = () => ws.send(`join ${this.roomId}`)
    }
    else {
      ws.onopen = () => ws.send('create')
    }

    ws.onmessage = function (event) {
      const args = event.data.split(' ')
      const command = args[0]

      switch (command) {
        case 'created':
          this.roomId = args[1]
          ws.send(`join ${this.roomId}`)
          break;

        case 'joined':

          console.log('Joined', args[1])
          break;

        case 'ERROR':
          console.err(event.data)
          break;

        default:
          console.err('Server sent an unexcepted message')
          break;
      }
    }
  }
}
</script>