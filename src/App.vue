<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <h1>
         <span class="title font-weight-bold">Dashboard</span>
        </h1>
        <Filtering />
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Filtering from "@/components/Filtering";
import { mapActions } from 'vuex';

export default {
  name: "App",
  components: { Navbar, Filtering },
  data: () => ({}),
  methods:{
    ...mapActions(['getCountriesData'])
  },
  created(){
    this.getCountriesData();
  }
};
</script>
