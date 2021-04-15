<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="600px">
      <v-card>
        <v-card-title dark>
          <span class="headline">Fin de la partie - Classement</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-list flat>
                <v-list-item
                  v-for="(p, i) in $store.getters.playersRanking"
                  :key="p.id"
                >

                  <v-list-item-icon>
                    <v-icon v-if="i < 3" :color="colors[i] || ''"
                      >mdi-trophy</v-icon
                    >
                    <v-icon v-else>mdi-trophy-broken</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="p.name + ': ' + p.scores.totals.total + ' pts.'"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="quit"> Quitter </v-btn>
          <v-btn color="green darken-4" text @click="replay" dark>
            Rejouer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    colors: ['amber accent-3', 'blue-grey lighten-2', 'brown darken-2']
  }),
  props: ['open'],
  methods: {
    quit () {
      this.$emit('close')
    },
    replay () {
      this.$store.dispatch('replay')
    }
  }
}
</script>

<style scoped>
.color {
  background-color: yellow;
}

.rank-2 {
}

.rank-3 {
}

.rank-other {
}
</style>