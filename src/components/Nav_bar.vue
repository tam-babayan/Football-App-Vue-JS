<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <span>Menu</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <template v-for="(item, index) in items">
            <v-list-tile :href="item.href" :to="{name: item.href}" :key="index">
              <v-list-tile-action>
                <v-icon light v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Super Puper Football Scores</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>lock</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [{
        href: 'Home',
        router: true,
        title: 'Home',
        icon: 'home'
      }]
    }
  }
}
</script>

<style scope>
</style>
