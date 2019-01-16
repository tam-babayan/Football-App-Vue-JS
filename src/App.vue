<template>
  <v-app>
    <navBar></navBar>
    <div id="container">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#container {
  margin-top: 45px
}
</style>
