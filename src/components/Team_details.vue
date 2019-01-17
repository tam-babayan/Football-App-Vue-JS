<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3 pt-4>
      <v-card>
        <v-card-title class="justify-center">
          <img :src = "logo" :width="200" />
            <h4 class="headline mb-0 font-weight-bold">
                {{teamName}}
            </h4>
        </v-card-title>
        <v-card-text>
        <v-container>
          <p><v-icon color='blue'>location_on</v-icon> {{teamAreaName}}</p>
          <p><span class="font-weight-medium">Short name:</span> {{teamShortName}}</p>
          <p><span class="font-weight-medium">Founded:</span> {{yearFounded}}</p>
          <p><span class="font-weight-medium">Club Colors:</span> {{teamColors}}</p>
          <p><span class="font-weight-medium">Coach:</span> {{teamCoach}}</p>
          <p><span class="font-weight-medium">Website: </span> <a :href="teamWebsite" target="_blank">{{teamWebsite}}</a></p>
          <p><v-icon  color="blue">email</v-icon><a :href="teamEmail">  {{teamEmail}}</a></p>
          <p><v-icon color='blue'>phone</v-icon><a :href="teamPhone" >{{teamPhone}}</a></p>
          <p><v-icon color='blue'>location_on</v-icon> {{teamAddress}}</p>
          <p><v-icon color='blue'>assistant_photo</v-icon> {{teamVenue}}</p>
          <table class="table">
            <thead>
              <th class="text-xs-left">Player</th>
              <th class="text-xs-left">Posiotn</th>
              <th class="text-xs-left">Number</th>
              <th class="text-xs-left">Age</th>
            </thead>
            <tbody>
              <tr v-for="player in players" :key ='player.id'>
                <td class="text-xs-left font-weight-medium">{{player.name}}</td>
                <td class="text-xs-left">{{player.position}}</td>
                <td class="text-xs-left">{{player.shirtNumber}}</td>
                <td class="text-xs-left">{{moment().diff(player.dateOfBirth, 'years')}}</td>
              </tr>
            </tbody>
          </table>
        </v-container>
        </v-card-text>
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
