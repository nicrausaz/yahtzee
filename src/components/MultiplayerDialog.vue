<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="600px">
      <v-card>
        <v-card-title dark>
          <span class="headline">Jeu en ligne</span>
        </v-card-title>
        <v-card-text>
          <v-list class="transparent">
            <v-list-item>
              <v-btn color="green darken-4" @click="create" block dark>
                Créer une partie
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-text-field
                color="green darken-4"
                label="Room ID (ex. 235211)"
                v-model="roomId"
                @keypress.enter="test"
                maxlength="8"
              >
                <template v-slot:append>
                  <v-btn dark tile color="green darken-4" @click="joinRoomId">
                    Rejoindre
                  </v-btn>
                </template>
              </v-text-field>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="quit">
            {{ $t("play.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    roomId: ''
  }),
  props: ['open'],
  methods: {
    quit () {
      this.$emit('close')
    },
    create () {
      this.$router.push({ name: 'Waitroom' })
    },
    joinRoomId () {
      if (this.roomId.length === 8) {
        this.$router.push({ name: 'Join', params: { roomid: this.roomId } })
      }
    }
  }
}
</script>