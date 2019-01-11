<template>
  <div>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data: () => ({
    // props: [competitionId],
    items: [
      {
        text: 'Leagues',
        disabled: false,
        href: '/'
      },
      {
        text: 'Matches',
        disabled: false,
        href: ''
      },
      {
        text: 'Team Details',
        disabled: true,
        href: ''
      }
    ]
  })
}
</script>

<style scope>
.v-breadcrumbs {
    padding: 18px 35px;
}
</style>
