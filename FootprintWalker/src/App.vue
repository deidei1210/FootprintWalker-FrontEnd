<template>
  <v-app>
    <v-main id="our_container">
      <!-- <v-container fluid> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-main>
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      snowScriptLoaded: false
    };
  }
}
</script>

<style scoped>
#our_container{
  background: #E6E6FA
}
</style>