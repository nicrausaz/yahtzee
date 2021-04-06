<template>
  <div class="home">
    <v-card class="mx-auto" max-width="800">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title>Let's play</v-card-title>

      <v-card-actions>
        <v-btn color="primary" @click="openPlayersDialog = true">Jouer</v-btn>
      </v-card-actions>
    </v-card>
    <PlayersDialog :open="openPlayersDialog" @close="openPlayersDialog = false"/>
  </div>
</template>

<script>
import PlayersDialog from "@/components/PlayersDialog.vue"

export default {
  name: 'Home',
  data: () => ({
    openPlayersDialog: false
  }),
  components: {
    PlayersDialog
  }
}
</script>
