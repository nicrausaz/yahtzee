<template>
  <div class="dice" @click="toggleLock">
    <v-icon size="100" :color="locked ? 'grey' : 'blue'">{{ representation }}</v-icon>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    toggleLock () {
      this.$store.commit('toggleDiceLock', this.$props.id)
    }
  },
  computed: {
    representation () {
      return "mdi-dice-" + this.$store.state.game.turn.dices.find(x => x.id === this.$props.id).value
    },
    locked () {
      return this.$store.state.game.turn.dices.find(x => x.id === this.$props.id).locked
    }
  }
}
</script>
