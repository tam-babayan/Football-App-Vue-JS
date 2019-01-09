<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list>
            <v-list-tile class='text-mx-center'>
                <v-list-tile-content>
                <v-list-tile-title class='text-xs-center font-weight-bold headline'>{{this.match.competition.name}}</v-list-tile-title>
                <v-list-tile-sub-title class='text-xs-center'>{{this.match.group}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile class='text-md-center'>
              <v-list-tile-content>
                <router-link class='nav-item' :to="{ path: '/team-details/' + match.homeTeam.id}">
                 <v-img :height="50" :width="50" :src="this.homeTeam.crestUrl"/>
                 {{this.match.homeTeam.name}}
                </router-link>
              </v-list-tile-content>
              <v-list-tile-content>
                <router-link class='nav-item' :to="{ path: '/team-details/' + match.awayTeam.id}">
                 <v-img :height="50" :width="50" :src="this.awayTeam.crestUrl"/>
                 {{this.match.awayTeam.name}}
                </router-link>
                <!-- <v-img  width='30' height='20' aspect-ratio='1'></v-img> -->
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
                    {{this.match.venue}}
                </v-list-tile-title>
                <v-list-tile-sub-title>{{this.homeTeam.address}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <google-map />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import clubs from '../assets/data/clubs.json'
import GoogleMap from './GoogleMap'
export default {
  data () {
    return {
      homeTeam: {},
      awayTeam: {},
      match: {},
      clubs: clubs
    }
  },
  components: {
    GoogleMap
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
          this.getLogos(this.match.homeTeam.id).then(response => {
            this.homeTeam = response.data
            console.log(this.homeTeam)
          })
          this.getLogos(this.match.awayTeam.id).then(response => {
            this.awayTeam = response.data
            console.log(this.awayTeam)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getLogos (id) {
      return axios
        .create({
          headers: {
            'X-Auth-Token': 'de35073be09a47748cd8ce50b6d68fd3'
          }
        })
        .get('http://api.football-data.org/v2/teams/' + id)
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.v-list__tile {
    height: 75px;
}
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
</style>
