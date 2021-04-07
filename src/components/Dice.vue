<template>
  <div class="dice" :class="{'noRoll': !lockable}" @click="toggleLock">
    <v-icon class="icon" size="100" :color="locked ? 'grey' : 'blue'" :style="rotation">{{
      representation
    }}</v-icon>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data : () => ({
    rotate: 0
  }),
  methods: {
    toggleLock () {
      if (this.lockable) {
        this.$store.commit('toggleDiceLock', this.$props.id)
      }
    },
    async animate () {
      if (!this.locked) {
        this.rotate += 360
      }
    }
  },
  computed: {
    representation () {
      return "mdi-dice-" + this.$store.state.game.turn.dices.find(x => x.id === this.$props.id).value
    },
    locked () {
      return this.$store.state.game.turn.dices.find(x => x.id === this.$props.id).locked
    },
    rotation () {
      return `transform: rotate(${ this.rotate }deg); transition: transform 1s;`
    },
    lockable () {
      return this.$store.state.game.turn.leftRolls < 3 && this.$store.state.game.turn.leftRolls
    }
  }
}
</script>

<style scoped>
.dice:hover {
  cursor: pointer;
}

.noRoll:hover {
  cursor: not-allowed !important;
}
</style>