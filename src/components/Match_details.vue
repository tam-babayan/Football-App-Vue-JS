<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <router-link :to="{ path: '/game-list/' + this.match.competition.id}">
            <v-btn flat small color="blue">Back to Matches </v-btn>
          </router-link>
          <v-list>
            <v-list-tile class='text-mx-center'>
              <v-list-tile-content>
                <v-list-tile-title class='text-xs-center font-weight-bold headline'>
                  <router-link :to="{ path: '/game-list/' + this.match.competition.id}">
                    <!-- <v-img :src="getLeagueLogo"/> -->
                    {{this.match.competition.name}}
                  </router-link>
                </v-list-tile-title>
                <v-list-tile-sub-title class='text-xs-center'>
                  {{this.match.group}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class='text-md-center'>
              <v-list-tile-content class="logos">
                <router-link :to="{ path: '/team-details/' + match.homeTeam.id}">
                  <v-img :height="50" :width="50" :src="this.homeTeam.crestUrl" />
                  {{this.match.homeTeam.name}}
                </router-link>
              </v-list-tile-content>
              <v-list-tile-content class="logos">
                <router-link :to="{ path: '/team-details/' + match.awayTeam.id}">
                  <v-img :height="50" :width="50" :src="this.awayTeam.crestUrl" />
                  {{this.match.awayTeam.name}}
                </router-link>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <div class="space-around">
                <v-list-tile-action>
                  <v-icon color='indigo'>calendar_today</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class='text-xs-center'>
                  {{ moment(match.utcDate).format('YYYY-MM-DD') }}
                </v-list-tile-content>
              </div>
              <div class="space-around">
                <v-list-tile-action>
                  <v-icon color='indigo'>access_time</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class='text-xs-center'>
                  {{ moment(match.utcDate).format('H:mm') }}
                </v-list-tile-content>
              </div>
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
import competitions from '../assets/data/competitions.json'
import GoogleMap from './GoogleMap'
export default {
  data () {
    return {
      homeTeam: {},
      awayTeam: {},
      match: {},
      competitions: competitions
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
        .get('https://api.football-data.org/v2/teams/' + id)
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  computed: {
    getLeagueLogo () {
      const tempArr = this.competitions.filter(one => one.id === this.match.competition.id)
      return tempArr[0].logo
    }
  }
}
</script>

<style scoped>
  .v-list__tile {
    display: flex;
    justify-content: space-around;
  }

  .v-list__tile__title {
    height: 70px;
    /* margin-bottom: 20px; */
  }

  .theme--light.v-list {
    padding-left: 30px;
    padding-right: 30px;
  }

  .v-list__tile__sub-title {
    font-size: 15px;
    overflow: visible;
  }

  .theme--light.v-icon {
    padding-left: 4px;
  }

  .v-list__tile__content {
    overflow: unset;
  }

  .logos {
    display: flex;
    align-items: center;
  }

  .v-list>div {
    height: 70px;
  }

</style>
