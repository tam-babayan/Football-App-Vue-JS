<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line>
              <v-list-tile class="text-md-center">
              <v-list-tile-content >
                {{getLeagueName}}
                <v-img :src="getLeagueLogo" width="30" height="20" aspect-ratio="1"></v-img>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-content class="text-xs-center">
                {{getLeagueName}}
                <v-img :src="getLeagueLogo" width="30" height="20" aspect-ratio="1"></v-img>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">location_on</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>1400 Main Street</v-list-tile-title>
                <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import competitions from '../assets/data/competitions.json'
export default {
  data () {
    return {
      competitions: competitions
    }
  },
  computed: {
    getLeagueName () {
      const tempArr = this.competitions.filter(one => one.id === this.$route.params.id)
      return tempArr[0].name
    },
    getLeagueLogo () {
      const tempArr = this.competitions.filter(one => one.id === this.$route.params.id)
      return tempArr[0].logo
    }
  }
}
</script>

<style>
</style>
