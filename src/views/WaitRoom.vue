<template>
  <v-card class="mx-auto" max-width="800">
    <v-img src="@/assets/dices.jpg" height="200px"></v-img>
    <v-card-text class="text--primary">
      
      <h1>Room ID: {{ $store.state.waitroom.roomId }}</h1>
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
            <v-col v-for="p in $store.state.waitroom.connectedPlayers" :key="p.abrev">
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
      <v-list-item v-if="$store.state.waitroom.socketConnected">
        <v-btn :color="readyBtnColor" @click="toggleReady" block dark
          >Prêt(e)</v-btn
        >
      </v-list-item>
      <v-list-item v-if="$store.state.waitroom.isHost">
        <v-btn
          color="green darken-4"
          block
          @click="startGame"
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
  }),
  methods: {
    toggleReady () {
      this.isReady = !this.isReady
      this.$store.state.waitroom.socket.send(`ready ${this.$store.state.waitroom.roomId}`)
    },
    updateName () {
      this.$store.state.waitroom.socket.send(`newname ${this.$store.state.waitroom.roomId} ${this.$store.state.waitroom.playerName}`)
    },
    async startGame () {
      await this.$store.dispatch('initGame', this.players)
      this.$router.push('/play/online/' + this.roomId)
    },
  },
  computed: {
    canStartGame () { return this.$store.getters['waitroom/allPlayersReady'] },
    readyBtnColor () { return this.isReady ? 'green darken-4' : 'red' },
    
    playerName: {
      get () {
        return this.$store.state.waitroom.playerName
      },
      set (value) {
        this.$store.commit('waitroom/setPlayerName', value)
      }
    }
  },

  created () {
    this.$store.dispatch('waitroom/initSocket')
    this.$store.dispatch('waitroom/setRoomId', this.$route.params.roomid)
    this.$store.dispatch('waitroom/joinOrCreateRoom')
  }
}
</script>