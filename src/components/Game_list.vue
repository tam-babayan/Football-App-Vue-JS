<template>
  <v-card>
    <v-card-title>
      {{getLeagueName}}
      <v-spacer></v-spacer>
      <v-text-field v-model='search' append-icon='search' label='Search' single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :loading='loading' :headers='headers' :items='matches' :search='search' :pagination.sync='pagination'
      class="elevation-1">
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'><router-link class="nav-item" :to="{ path: '/team-details/' + props.item.homeTeam.id }">{{ props.item.homeTeam.name }}</router-link></td>
          <td class='text-xs-left'><router-link class="nav-item" :to="{ path: '/team-details/' + props.item.awayTeam.id}">{{ props.item.awayTeam.name }}</router-link></td>
          <td class='text-xs-left'>{{ (new Date(props.item.utcDate)).toLocaleDateString("en-US") }}</td>
          <td class='text-xs-left'>
          <router-link class="nav-item" :to="{ path: '/match-details/' + props.item.id}">details</router-link>
          </td>
        </template>
      <v-alert
        slot='no-results'
        :value='true'
        color='error'
        icon='warning'
      >Your search for '{{ search }}' found no results.</v-alert>
    </v-data-table>
  </v-card>
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
        rowsPerPage: 100
      },
      headers: [
        { text: 'HomeTeam', value: 'homeTeam.name' },
        { text: 'AwayTeam', value: 'awayTeam.name' },
        { text: 'Date', value: 'utcDate' },
        { text: 'Action', value: 'action', sort: false }
      ],
      matches: []
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
    }
  }
}
</script>

<style>
</style>
