<template>
  <div>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return [
        {
          text: 'Back to Leagues',
          disabled: false,
          href: '/'
        },
        {
          text: 'Team Details',
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
