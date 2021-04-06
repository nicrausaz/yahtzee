<template>
  <div class="playboard">
    <v-card id="board" color="green darken-4" elevation="2" height="500">
    </v-card>

    <v-card id="dices">
      <v-card-title>Au tour de: {{ $store.getters.currentTurnPlayerName }}</v-card-title>
      <v-divider></v-divider>
      <div class="d-flex justify-space-around">
        <Dice v-for="dice in dices" :key="dice.id" :id="dice.id" />
      </div>
      <v-divider></v-divider>

      <v-btn block @click="roll" :disabled="!canRool"
        >Lancer ({{ $store.state.game.turn.leftRolls }} restants)
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