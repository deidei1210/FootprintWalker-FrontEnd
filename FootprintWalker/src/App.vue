<template>
  <v-app>
    <v-main id="our_container">
      <!-- <v-container fluid> -->
        <vue-particles
            id="particles-js"
            color="#663399"
            :particleOpacity="0.7"
            :particlesNumber="100"
            shapeType="star"
            :particleSize="6"
            linesColor="#BA55D3"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="100"
            :moveSpeed="1"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="repulse">
        </vue-particles>
        <router-view></router-view>
      <!-- </v-container> -->
    </v-main>
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script setup>
//
</script>
<style scoped>
#particles-js {
  width: 100%;
  height: calc(100%);
  position: absolute;
}
#our_container{
  background: #E6E6FA
}
</style>