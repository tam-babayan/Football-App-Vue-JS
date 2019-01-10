<template>
<div class="container">
  <v-card>
    <v-card-title class="text-xs-left">
      <v-img :src="getLeagueLogo"/>
      <v-spacer></v-spacer>
      <h3 class="font-weight-bold ">{{getLeagueName}}</h3>
      <v-spacer></v-spacer>
      <v-text-field v-model='search' append-icon='search' label='Search' single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers='headers' :items='matches' :search='search' :pagination.sync='pagination'
      class="elevation-1">
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'>
            <!-- <v-img :src="getTeamLogo"/> -->
            <router-link  :to="{ path: '/team-details/' + props.item.homeTeam.id }">
            {{ props.item.homeTeam.name }}</router-link></td>
          <td class='text-xs-left'>
            <!-- <v-img :src="getTeamLogo"/> -->
            <router-link  :to="{ path: '/team-details/' + props.item.awayTeam.id}">
            {{ props.item.awayTeam.name }}
            </router-link></td>
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
          'https://api.football-data.org/v2/competitions/' + this.$route.params.id + '/matches?status=SCHEDULED'
        )
        .then(response => {
          this.matches = response.data.matches
          this.loading = false
          console.log(this.matches)
          this.getLogo()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
          console.log(this.logos)
        })
        .catch(function (error) {
          console.log(error)
        })
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
    },
    getTeamLogo () {
      const tempArr = this.logos.teams.filter(one => one.id === (this.matches.homeTeam.id || this.matches.awayTeam.id))
      return tempArr.teams[0].crestUrl
    }
  }
}
</script>

<style scope>
</style>
