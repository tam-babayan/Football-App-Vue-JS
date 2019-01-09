<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list>
            <v-list-tile class='text-mx-center'>
                <v-list-tile-content>
                <v-list-tile-title class="text-xs-center font-weight-bold headline">{{this.match.competition.name}}</v-list-tile-title>
                <v-list-tile-sub-title class="text-xs-center">{{this.match.group}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile class='text-md-center'>
              <v-list-tile-content>
                <!-- {{getAwayLeagueLogo}} -->
                {{this.match.awayTeam.name}}
                <!-- <v-img  :src='getAwayLeagueLogo' width='30' height='20' aspect-ratio='1'></v-img> -->
              </v-list-tile-content>
              <v-list-tile-content>
                <!-- {{getHomeLeagueLogo}} -->
                {{this.match.homeTeam.name}}
                <!-- <v-img  width='30' height='20' aspect-ratio='1'></v-img> -->
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color='indigo'>calendar_today</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class='text-xs-center'>
                  {{ (new Date(match.utcDate)).toLocaleDateString("en-US") }}
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color='indigo'>access_time</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class='text-xs-center'>
                  missing
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
                <v-list-tile-sub-title>{{getVenueAddress}}</v-list-tile-sub-title>
                <google-map />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import clubs from '../assets/data/clubs.json'
import GoogleMap from "./components/GoogleMap"
export default {
  data () {
    return {
      match: [],
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
          this.loading = false
          console.log(this.match)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  computed: {
    getAwayLeagueLogo () {
      const tempArr = this.clubs.filter(
        one => one.club === this.match.awayTeam.name
      )
      return tempArr[0].logo
    },
    getHomeLeagueLogo () {
      const tempArr = this.clubs.filter(
        one => one.club === this.match.awayTeam.name
      )
      return tempArr[0].logo
    },
    getVenueAddress () {
      const tempArr = this.clubs.filter(
        one => one.stadium_name === this.match.venue
      )
      return tempArr[0].stadium_address
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
</style>
