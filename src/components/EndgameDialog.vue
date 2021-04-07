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
                  v-for="p in $store.getters.playersRanking"
                  :key="p.id"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-trophy</v-icon>
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
  props: ['open'],
  data: () => ({

  }),
  methods: {
    quit () {
      this.$emit('close')
      this.$router.push({ name: 'Home' })
    },
    replay () {
      this.$store.dispatch('replay')
      //this.$emit('close')
    }
  }
}
</script>