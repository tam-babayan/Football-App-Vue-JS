<template>
<div class="container">
  <v-card>
    <v-card-title class="text-xs-left">
      <v-img :src="getLeagueLogo" :width='50'/>
      <v-spacer></v-spacer>
      <h3 class="font-weight-bold ">{{getLeagueName}}</h3>
      <v-spacer></v-spacer>
      <v-text-field v-model='search' append-icon='search' label='Search' single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :loading='loading' :headers='headers' :items='matches' :search='search' :pagination.sync='pagination'
      class="elevation-1">
        <v-progress-linear slot="progress" color="black" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
            <td class='text-xs-left'>
              <router-link  :to="{ path: '/team-details/' + props.item.homeTeam.id }">
                <v-img :width="30" :src="getTeamLogo(props.item.homeTeam.id)" @error="getDefaultLogo(props.item.homeTeam.id)"/>
                {{ props.item.homeTeam.name }}
              </router-link>
            </td>
            <td class='text-xs-left'>
                <router-link  :to="{ path: '/team-details/' + props.item.awayTeam.id}">
                  <v-img :width="30" :src="getTeamLogo(props.item.awayTeam.id)" @error="getDefaultLogo(props.item.awayTeam.id)"/>
                  {{ props.item.awayTeam.name }}
                </router-link>
            </td>
            <td class='text-xs-left'>{{ moment(props.item.utcDate).format('YYYY-MM-DD, HH:mm') }}</td>
            <td class='text-xs-left'>
            <router-link :to="{ path: '/match-details/' + props.item.id}">Match Details</router-link>
            </td>
        </template>
    </v-data-table>
  </v-card>
  </div>
</template>

<script>
import competitions from '../assets/data/competitions.json'
import axios from 'axios'

export default {
  data () {
    return {
      competitions: competitions,
      search: null,
      loading: true,
      pagination: {
        rowsPerPage: 100,
        sortBy: 'utcDate'
      },
      headers: [
        { text: 'HomeTeam', value: 'homeTeam.name' },
        { text: 'AwayTeam', value: 'awayTeam.name' },
        { text: 'Date', value: 'utcDate' },
        { text: 'Action', value: 'action', sort: false }
      ],
      matches: [],
      logos: {}
    }
  },
  computed: {
    // filters the league, which id is passed by the router
    getLeagueName () {
      const tempArr = this.competitions.filter(one => one.id === this.$route.params.id)
      return tempArr[0].name
    },
    // filters the league, which id is passed by the router
    getLeagueLogo () {
      const tempArr = this.competitions.filter(one => one.id === this.$route.params.id)
      return tempArr[0].logo
    }
  },
  // calls fetching functions
  mounted () {
    this.getData()
    this.getLogo()
  },
  methods: {
    // fetches match info based on legaue id
    getData () {
      axios
        .create({
          headers: {
            'X-Auth-Token': 'de35073be09a47748cd8ce50b6d68fd3'
          }
        })
        .get(
          'https://api.football-data.org/v2/competitions/' + this.$route.params.id + '/matches?status=SCHEDULED'
        )
        .then(response => {
          this.matches = response.data.matches
          this.loading = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // fetches logos with another API call
    getLogo () {
      axios
        .create({
          headers: {
            'X-Auth-Token': 'de35073be09a47748cd8ce50b6d68fd3'
          }
        })
        .get('https://api.football-data.org/v2/competitions/' + this.$route.params.id + '/teams')
        .then(response => {
          this.logos = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // filters fetched info to take matching logos
    // when there is no info sets a default image
    getTeamLogo (id) {
      const tempArr = this.logos.teams.filter(one => one.id === id)
      return tempArr[0].crestUrl || './static/img/ball1.png'
    },
    // in case of error (image info exists but is invalid and there is no image) shows the default image
    getDefaultLogo (id) {
      this.logos.teams.map((one) => {
        if (one.id === id) {
          one.crestUrl = './static/img/ball1.png'
        }
      })
    }
  }
}
</script>

<style scope>
table,
.v-table,
 tbody,
td:first-child {
 padding: 0 15px;
}
</style>
