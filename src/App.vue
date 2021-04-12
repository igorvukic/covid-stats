<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <Filtering />
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Filtering from "@/components/Filtering";

export default {
  name: "App",
  components: { Navbar, Filtering },
  data: () => ({}),
};
</script>
