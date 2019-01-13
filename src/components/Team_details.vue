<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
            <h4 class="headline mb-0">
                <img :src = "logo" :width="200" />
                {{teamName}}
            </h4>
        </v-card-title>
        <v-container>
          <p>Country: {{teamAreaName}}</p>
          <p>Address: {{teamAddress}}</p>
          <p>Short name: {{teamShortName}}</p>
          <p>Founded: {{yearFounded}}</p>
          <p>Website: {{teamWebsite}}</p>
          <p style="word-wrap: break-word">Email: {{teamEmail}}</p>
          <p>Phone: {{teamPhone}}</p>
          <p>Club Colors: {{teamColors}}</p>
          <p>Venue: {{teamVenue}}</p>
          <p>Coach: {{teamCoach}}</p>
          <table class="table">
            <thead>
              <th class="text-xs-center">Player</th>
              <th class="text-xs-center">Posiotn</th>
              <th class="text-xs-center">Number</th>
              <th class="text-xs-center">Age</th>
            </thead>
            <tbody>
              <tr v-for="player in players" :key ='player.id'>
                <td class="text-xs-center">{{player.name}}</td>
                <td class="text-xs-center">{{player.position}}</td>
                <td class="text-xs-center">{{player.shirtNumber}}</td>
                <td class="text-xs-center">{{moment().diff(player.dateOfBirth, 'years')}}</td>
              </tr>
            </tbody>
          </table>
        </v-container>
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
      teamLogo: null,
      teamName: null,
      teamAreaName: null,
      teamAddress: null,
      teamShortName: null,
      yearFounded: null,
      teamWebsite: null,
      teamEmail: null,
      teamPhone: null,
      teamColors: null,
      teamVenue: null,
      squad: []
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
        .get('https://api.football-data.org/v2/teams/' + this.$route.params.id)
        .then(response => {
          this.team = response.data
          this.teamLogo = this.team.crestUrl
          this.teamName = this.team.name
          this.teamAreaName = this.team.area.name
          this.teamAddress = this.team.address
          this.teamShortName = this.team.shortName
          this.yearFounded = this.team.founded
          this.teamWebsite = this.team.website
          this.teamEmail = this.team.email
          this.teamPhone = this.team.phone
          this.teamColors = this.team.clubColors
          this.teamVenue = this.team.venue
          this.squad = this.team.squad
          console.log(this.team)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  computed: {
    logo () {
      return this.teamLogo || './static/img/ball1.png'
    },
    teamCoach () {
      let arr = this.squad.filter(one => one.role === 'COACH')
      return arr[0] ? arr[0].name : null
    },
    players () {
      return this.squad.filter(one => one.role === 'PLAYER')
    }
  }
}
</script>

<style>
</style>
