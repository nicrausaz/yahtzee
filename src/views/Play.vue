<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="5">
        <v-sheet rounded="lg"><ScoreCard /></v-sheet>
      </v-col>

      <v-col cols="12" sm="7">
        <v-sheet rounded="lg"><PlayBoard /> </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScoreCard from '@/components/ScoreCard.vue'
import PlayBoard from '@/components/PlayBoard.vue'

export default {
  components: { ScoreCard, PlayBoard },
  name: 'Play',
  mounted () {
    window.onbeforeunload = (event) => {
      const e = event || window.event
      e.preventDefault()
      if (e) {
        e.returnValue = ''
      }
      return ''
    }

    if (!this.$store.state.players.length) {
      this.$router.push({ name: 'Home' })
    }
  },
  unmounted () {
    window.removeEventListener("beforeunload", null);
  }
}
</script>

<style scoped>
</style>
