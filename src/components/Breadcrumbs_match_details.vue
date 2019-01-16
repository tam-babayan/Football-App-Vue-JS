<template>
  <div>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: ['competitionId'],
  computed: {
    items () {
      return [
        {
          text: 'Leagues',
          disabled: false,
          href: '/'
        },
        {
          text: 'Matches',
          disabled: false,
          href: '/#/game-list/' + this.competitionId
        },
        {
          text: 'Match Details',
          disabled: true,
          href: ''
        }
      ]
    }
  }
}
</script>

<style scope>
</style>
