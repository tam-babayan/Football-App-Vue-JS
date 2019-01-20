<template>
<v-container grid-list-xs px-2>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <breadCrumbsMatch class="justify-left" :competitionId=competitionId></breadCrumbsMatch>
      <v-card>
        <v-card-title class="justify-center">
          <router-link :to="{ path: '/game-list/' + competitionId}">
            <h3 class="font-weight-medium">{{competitionName}}</h3>
          </router-link>
        </v-card-title>
        <v-layout justify-center row>
          <v-flex xs4 sm6 md4 lg4 px-1>
            <router-link :to="{ path: '/team-details/' + homeTeamId}">
              <v-img :height="100" :width="100" :src="getTeamLogo(this.homeTeamLogo)"
                @error="getDefaultLogoHomeTeam()"/>
              <p class="text-xs-center">{{homeTeamName}}</p>
            </router-link>
            <v-card-actions class="justify-center">
            </v-card-actions>
          </v-flex>
          <v-flex xs4 sm6 md4 lg4 px-1>
            <router-link :to="{ path: '/team-details/' + awayTeamId}">
              <v-img :height="100" :width="100" :src="getTeamLogo(this.awayTeamLogo)"
                @error="getDefaultLogoAwayTeam()"/>
              <p class="text-xs-center">{{awayTeamName}}</p>
            </router-link>
            <v-card-actions class="justify-center">
            </v-card-actions>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout>
          <v-flex px-4>
            <v-icon color='blue'>calendar_today</v-icon>
            {{ moment(match.utcDate).format('YYYY-MM-DD') }}
            <v-icon color='blue'>access_time</v-icon>
            {{ moment(match.utcDate).format('H:mm') }}
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout>
          <v-flex px-4>
            <v-icon color='blue'>location_on</v-icon>
            {{matchVenue}}
            {{homeTeamAddress}}
            <v-card-actions>
              <iframe width="100%" height="300" frameborder="0" style="border:0" :src=mapUrl></iframe>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import competitions from '../assets/data/competitions.json'
export default {
  data () {
    return {
      competitionId: null,
      competitionName: null,
      matchGroup: null,
      homeTeamId: null,
      homeTeamLogo: '',
      homeTeamName: null,
      awayTeamLogo: '',
      awayTeamName: null,
      matchVenue: null,
      homeTeamAddress: null,
      awayTeamId: null,
      homeTeam: {},
      awayTeam: {},
      match: {},
      competitions: competitions,
      mapUrl: ''
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
        .get(
          'https://api.football-data.org/v2/matches/' +
          this.$route.params.id +
          '?status=SCHEDULED'
        )
        .then(response => {
          this.match = response.data.match
          console.log(this.match)
          this.competitionId = response.data.match.competition.id
          this.competitionName = this.match.competition.name
          this.matchGroup = this.match.group
          this.homeTeamId = this.match.homeTeam.id
          this.homeTeamName = this.match.homeTeam.name
          this.matchVenue = this.match.venue
          this.getLogosfromAPI(this.match.homeTeam.id).then(response => {
            this.homeTeam = response.data
            this.homeTeamLogo = this.homeTeam.crestUrl
            this.homeTeamAddress = this.homeTeam.address
            console.log(this.homeTeam)

            this.mapUrl = 'https://www.google.com/maps/embed/v1/place?q=' + this.homeTeam.address +
              '&key=AIzaSyDY1h7DRZVDA-kiv0hU7EgEAd4Jz-QHxDA'
          })
          this.getLogosfromAPI(this.match.awayTeam.id).then(response => {
            this.awayTeam = response.data
            this.awayTeamLogo = this.awayTeam.crestUrl
            this.awayTeamName = this.match.awayTeam.name
            this.awayTeamId = this.match.awayTeam.id
            console.log(this.awayTeam)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getLogosfromAPI (id) {
      return axios
        .create({
          headers: {
            'X-Auth-Token': 'de35073be09a47748cd8ce50b6d68fd3'
          }
        })
        .get('https://api.football-data.org/v2/teams/' + id)
        .catch(function (error) {
          console.log(error)
        })
    },
    getTeamLogo (teamLogo) {
      return teamLogo || './static/img/ball1.png'
    },
    getDefaultLogoHomeTeam () {
      this.homeTeamLogo = './static/img/ball1.png'
    },
    getDefaultLogoAwayTeam () {
      this.awayTeamLogo = './static/img/ball1.png'
    }
  },
  computed: {
    getLeagueLogo () {
      const tempArr = this.competitions.filter(one => one.id === this.competitionId)
      return tempArr[0].logo
    }
  }
}
</script>

<style scoped>
</style>
