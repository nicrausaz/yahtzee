<template>
  <div class="playboard">
    <v-card id="dices">
      <v-card-title>
        {{
          $t("play.turn_of_player", {
            name: $store.getters.currentTurnPlayerName,
          })
        }}</v-card-title
      >
      <v-card-subtitle>{{ $t("play.click_on_dice_instructions") }}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card class="d-flex justify-space-around" height="100">
        <Dice v-for="dice in dices" :key="dice.id" :id="dice.id" ref="dices"/>
      </v-card>
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