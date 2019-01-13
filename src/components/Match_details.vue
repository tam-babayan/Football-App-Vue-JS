<template>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <breadCrumbsMatch :competitionId=competitionId></breadCrumbsMatch>
          <v-list>
            <v-list-tile class='text-mx-center'>
              <v-list-tile-content>
                <v-list-tile-title class='text-xs-center font-weight-bold headline'>
                  <router-link :to="{ path: '/game-list/' + competitionId}">
                    {{competitionName}}
                  </router-link>
                </v-list-tile-title>
                <v-list-tile-sub-title class='text-xs-center'>
                  {{matchGroup}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class='text-md-center'>
              <v-list-tile-content align-center justify-center row>
                <router-link :to="{ path: '/team-details/' + homeTeamId}">
                  <v-img :height="50" :width="50" :src="getTeamLogo(this.homeTeamLogo)" />
                  {{homeTeamName}}
                </router-link>
              </v-list-tile-content>
              <v-list-tile-content align-center justify-center row>
                <router-link :to="{ path: '/team-details/' + awayTeamId}">
                  <v-img :height="50" :width="50" :src="getTeamLogo(this.awayTeamLogo)" />
                  {{awayTeamName}}
                </router-link>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
                <v-list-tile-action>
                  <v-icon color='indigo'>calendar_today</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class='text-xs-center'>
                  {{ moment(match.utcDate).format('YYYY-MM-DD') }}
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon color='indigo'>access_time</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class='text-xs-center'>
                  {{ moment(match.utcDate).format('H:mm') }}
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color='indigo'>location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{matchVenue}}
                </v-list-tile-title>
                <v-list-tile-sub-title class="text-xs-left">
                  {{homeTeamAddress}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <div id=map><iframe width="100%" height="450" frameborder="0"
          style="border:0" :src=mapUrl></iframe></div>
        </v-card>
      </v-flex>
    </v-layout>
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

            this.mapUrl = 'https://www.google.com/maps/embed/v1/place?q=' + this.homeTeam.address + '&key=AIzaSyDY1h7DRZVDA-kiv0hU7EgEAd4Jz-QHxDA'
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
  .v-list__tile__title {
    height: 70px;
  }
  .theme--light.v-list {
    padding-left: 30px;
    padding-right: 30px;
  }
  .v-list__tile__sub-title {
    font-size: 15px;
    overflow: visible;
  }
  .v-list__tile__content {
    overflow: unset;
  }
  .v-list>div {
    height: 70px;
  }
</style>
