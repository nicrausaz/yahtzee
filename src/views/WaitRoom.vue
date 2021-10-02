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
          <h2>Room ID: #234529</h2>
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
    playerName: '',
    players: [
      {
        name: "Nicolas",
        abrev: "NI"
      },
      {
        name: "Test",
        abrev: "TE"
      },
      {
        name: "Test2",
        abrev: "T2"
      },
      {
        name: "Test2",
        abrev: "T3"
      }
    ]
  }),
  props: [],
  methods: {
    startGame () {

    },
  },
  computed: {
    canStartGame () { return this.playerName != '' && this.players.length > 0 }
  }
}
</script>