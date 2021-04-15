<template>
  <v-app>
    <v-app-bar app dense color="green darken-4" dark>
      <v-icon>mdi-dice-5</v-icon>
      <v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="l in languages" :key="l">
            <v-list-item-title @click="switchLanguage(l)">
              {{ l }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    languages: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
  }),
  methods: {
    switchLanguage (locale) {
      if (locale != this.$i18n.locale) {
        this.$i18n.locale = locale
      }
    }
  }
}
</script>
