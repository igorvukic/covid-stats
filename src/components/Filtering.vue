<template>
  <v-toolbar
  flat
  class="my-6 mx-0"
  >
    <v-autocomplete
      v-model="selectedItems"
      :items="foundItems"
      :search-input.sync="search"
      cache-items
      hide-no-data
      hide-details
      label="Which countries are you intrested in?"
      chips
      deletable-chips
      multiple
      solo
    ></v-autocomplete>
  </v-toolbar>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        foundItems: [],
        search: null,
        selectedItems: null,
      }
    },
    watch: {
      search(val) {
        val && this.searchCountries(val);
      },
      selectedItems() {
        this.filterData();
      }
    },
    methods: {
      ...mapActions(['filterCountriesData']),
      searchCountries (v) {
          this.foundItems = this.countriesList.filter(e => {
            return (e || '').toLowerCase().includes((v || '').toLowerCase());
          })
      },
      filterData(){
        this.filterCountriesData({field: 'Country', fieldValuesList: this.selectedItems});
      }
    },
    computed: {
      ...mapGetters(['countriesList'])
    }
  }
</script>