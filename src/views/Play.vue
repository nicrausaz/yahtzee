<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet rounded="lg" min-height="268"><ScoreCard /></v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg">
          Play zone
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScoreCard from '@/components/ScoreCard.vue'
export default {
  components: { ScoreCard },
  name: 'Play'
}
</script>

<style scoped>
</style>
