<template>
  <div class="home">
    <v-card class="mx-auto" max-width="800">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title> Let's play </v-card-title>

      <v-card-actions>
        <router-link to="/play/computer"><v-btn color="primary"> Play </v-btn></router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
