<template>
  <div class="playboard">
    <v-card id="board" color="green darken-4" elevation="2" height="500" dark>
    </v-card>
    <v-card id="dices">
      <v-card-title>
        {{
          $t("play.turn_of_player", {
            name: $store.getters.currentTurnPlayerName,
          })
        }}</v-card-title
      >
      <v-divider></v-divider>
      <div class="d-flex justify-space-around">
        <Dice v-for="dice in dices" :key="dice.id" :id="dice.id" ref="dices" />
      </div>
      <v-divider></v-divider>

      <v-btn block @click="roll" :disabled="!canRool">
        <span v-if="$store.state.game.turn.leftRolls">{{
          $t("play.nb_left_rolls", { number: $store.state.game.turn.leftRolls })
        }}</span>
        <span v-else>{{ $t("play.choose") }}</span>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import Dice from '@/components/Dice.vue'

export default {
  components: { Dice },
  methods: {
    roll () {
      this.$refs.dices.forEach(d => d.animate())
      this.$store.dispatch('rollDices')
    }
  },
  computed: {
    dices () {
      return this.$store.state.game.turn.dices
    },
    canRool () {
      return this.$store.state.game.turn.leftRolls > 0
    }
  }
}
</script>

<style scoped>
#board {
  border: 20px solid burlyWood !important;
}
</style>