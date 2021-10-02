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
            >{{ $t("home.offline") }}</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn
            color="green darken-4"
            @click="openMultiplayerDialog = true"
            block
            dark
            >{{ $t("home.online") }}</v-btn
          >
        </v-list-item>
      </v-list>
    </v-card>
    <PlayersDialog
      :open="openPlayersDialog"
      @close="openPlayersDialog = false"
    />
    <MultiplayerDialog
      :open="openMultiplayerDialog"
      @close="openMultiplayerDialog = false"
    />
  </div>
</template>

<script>
import RulesText from "@/components/RulesText.vue"
import PlayersDialog from "@/components/PlayersDialog.vue"
import MultiplayerDialog from "@/components/MultiplayerDialog.vue"

export default {
  name: 'Home',
  data: () => ({
    openPlayersDialog: false,
    openMultiplayerDialog: false
  }),
  components: {
    PlayersDialog,
    RulesText,
    MultiplayerDialog
  }
}
</script>
