<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Joueurs</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nom du joueur 1"
                  v-model="players[0]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nom du joueur 2"
                  v-model="players[1]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nom du joueur 3"
                  v-model="players[2]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nom du joueur 4"
                  v-model="players[3]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$emit('close')"> Annuler </v-btn>
          <v-btn color="green" text @click="startGame"> Commencer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['open'],
  data: () => ({
    players: []
  }),
  methods: {
    async startGame () {
      if (this.players.length) {
        await this.$store.dispatch('initGame', this.players)

        this.$router.push('/play/local')
      }
    }
  }
}
</script>