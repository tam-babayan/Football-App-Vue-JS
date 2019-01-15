<template>
    <v-container>
    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title class="text-xs-center display-2">
            Favorite Leagues and Cups
        </v-card-title>
        <v-card-actions>
        </v-card-actions>
        <!-- <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
        </v-card-title>

        <v-card-actions>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
          </v-card-text>
        </v-slide-y-transition> -->
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import competitions from '../assets/data/competitions.json'
import {eventBus} from '../main'
export default {
  name: 'favorites',
  data () {
    return {
      competitions: competitions,
      favorites: []
    }
  },
  created () {
    eventBus.$on('changeOfFavorites', data => {
      this.favorites = data
      console.log('yo')
      console.log(this.favorites)
    })
  }
}
</script>

<style>

</style>
