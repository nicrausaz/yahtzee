<template>
  <span>
    <span v-if="selectable && isPlayerTurn">
      <v-icon small @click="record">mdi-pencil</v-icon>
    </span>
    <span v-else-if="!isPlayerTurn || !selectable">{{ value }}</span>
  </span>
</template>

<script>
export default {
  props: ['zone', 'att', 'id'],
  computed: {
    isPlayerTurn () {
      return this.$store.state.game.turn.to == this.$props.id
    },
    selectable () {
      return this.$store.state.players[this.$props.id].scores[this.$props.zone][this.$props.att] == null
    },
    value () {
      return this.$store.state.players[this.$props.id].scores[this.$props.zone][this.$props.att]
    }
  },
  methods: {
    record () {
      this.$store.dispatch('editScore', { id: this.$props.id, zone: this.$props.zone, att: this.$props.att })
      this.$store.dispatch('nextTurn')
      this.$emit('added')
    }
  }
}
</script>