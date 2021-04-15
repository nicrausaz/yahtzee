<template>
  <div class="home">
    <v-card class="mx-auto" max-width="800">
      <v-img src="@/assets/dices.jpg" height="200px"></v-img>

      <v-card-text class="text--primary">
        <RulesText />
      </v-card-text>

      <v-list class="transparent">
        <v-list-item>
          <v-btn
            color="green darken-4"
            @click="openPlayersDialog = true"
            block
            dark
            >Jouer hors ligne</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn color="green darken-4" block dark>Jouer en ligne</v-btn>
        </v-list-item>
      </v-list>
    </v-card>
    <PlayersDialog
      :open="openPlayersDialog"
      @close="openPlayersDialog = false"
    />
  </div>
</template>

<script>
import RulesText from "@/components/RulesText.vue"
import PlayersDialog from "@/components/PlayersDialog.vue"

export default {
  name: 'Home',
  data: () => ({
    openPlayersDialog: false
  }),
  components: {
    PlayersDialog,
    RulesText
  }
}
</script>
