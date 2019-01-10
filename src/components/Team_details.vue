<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!-- <router-link :to="{ path: '/game-list/' + this.match.competition.id}">
            <v-btn flat small>Back to Matches </v-btn>
          </router-link> -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
                <img :src = "this.team.crestUrl" :width="200" />
                {{this.team.name}}
            </h3>
            <div>Country: {{this.team.area.name}}</div>
            <div>Address: {{this.team.address}}</div>
            <div>Short name: {{this.team.shortName}}</div>
            <div>Founded: {{this.team.founded}}</div>
            <div>Website: {{this.team.website}}</div>
            <div>Email: {{this.team.email}}</div>
            <div>Phone: {{this.team.phone}}</div>
            <div>Club Colors: {{this.team.clubColors}}</div>
            <div>Venue: {{this.team.venue}}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      team: [],
      loading: true
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios
        .create({
          headers: {
            'X-Auth-Token': 'de35073be09a47748cd8ce50b6d68fd3'
          }
        })
        .get('http://api.football-data.org/v2/teams/' + this.$route.params.id)
        .then(response => {
          this.team = response.data
          this.loading = false
          console.log(this.team)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  // computed: {
  //   Backtomatchesbutton () {

  //   }
  // }
}
</script>

<style>
</style>
