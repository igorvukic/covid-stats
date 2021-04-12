<template>
  <v-navigation-drawer
    dark
    class="light-blue darken-4"
    permanent
    expand-on-hover
    app
  >
    <v-list-item>
      <v-icon>mdi-virus</v-icon>

      <v-list-item-title class="ml-4">
        <span class="title text-uppercase font-weight-bold">Covid</span>
        <span class="title">Stats</span>
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item v-for="link in links" :key="link.text" :to="link.path">
        <v-list-item-icon>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{link.text}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
data () {
    return {
        links: [
            {text: "Table view", path: "/table", icon: "mdi-table"},
            {text: "Chart view", path: "/chart", icon: "mdi-chart-bar"},
        ]
    }
}
}
</script>
