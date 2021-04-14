<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="filteredCountriesData"
      class="elevation-1"
      disable-pagination
      hide-default-footer
      :loading="loading"
      loading-text="Loading countries data..."
    >
    <template v-slot:item.TotalConfirmed="{ item }">
      {{item.TotalConfirmed | formatNumber}}
    </template>
    <template v-slot:item.TotalDeaths="{ item }">
      {{item.TotalDeaths | formatNumber}}
    </template>
    <template v-slot:item.TotalRecovered="{ item }">
      {{item.TotalRecovered | formatNumber}}
    </template>
      <template slot="body.append">
        <tr>
          <th class="body-2 text-uppercase font-weight-bold">Totals</th>
          <th class="body-2  font-weight-bold text-right">{{ total.confirmed | formatNumber }}</th>
          <th class="body-2  font-weight-bold text-right">{{ total.deaths | formatNumber}}</th>
          <th class="body-2  font-weight-bold text-right">{{ total.recovered | formatNumber}}</th>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: "Country", value: 'Country'},
        { text: "Total Confirmed", value: 'TotalConfirmed', align: 'end' },
        { text: "Total Deaths", value: 'TotalDeaths', align: 'end' },
        { text: "Total Recovered", value: 'TotalRecovered', align: 'end' },
      ],
      loading: false,
    };
  },
  computed: {
    ...mapState(["filteredCountriesData"]),
    total(){
      const reducer = (acc, cur) => {
        acc.confirmed += cur.TotalConfirmed;
        acc.deaths += cur.TotalDeaths;
        acc.recovered += cur.TotalRecovered;
        return acc;
      }
      return this.filteredCountriesData.reduce(reducer,{confirmed: 0, deaths: 0, recovered: 0})
    }
  },
  methods: {
    ...mapActions(["getCountriesData"]),

    async loadCountriesData() {
      this.loading = true;
      await this.getCountriesData();
      this.loading = false;
    },
  },
  async created() {
    await this.loadCountriesData();
  },
};
</script>

