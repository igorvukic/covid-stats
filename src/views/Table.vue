<template>
  <v-container>
    <v-skeleton-loader
      type="table-thead, table-row-divider@12"
      v-if="loading"
    ></v-skeleton-loader>
    <v-data-table
      v-else
      :headers="headers"
      :items="filteredCountriesData"
      class="elevation-1"
      disable-pagination
      hide-default-footer
    >
      <!-- eslint-disable-next-line -->
      <template v-slot:item.TotalConfirmed="{ item }">
        {{ item.TotalConfirmed | formatNumber }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.TotalDeaths="{ item }">
        {{ item.TotalDeaths | formatNumber }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.TotalRecovered="{ item }">
        {{ item.TotalRecovered | formatNumber }}
      </template>
      <template slot="body.append">
        <tr>
          <th class="body-2 text-uppercase font-weight-bold">Totals</th>
          <th class="body-2 font-weight-bold text-right">
            {{ total.confirmed | formatNumber }}
          </th>
          <th class="body-2 font-weight-bold text-right">
            {{ total.deaths | formatNumber }}
          </th>
          <th class="body-2 font-weight-bold text-right">
            {{ total.recovered | formatNumber }}
          </th>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: "Country", value: "Country" },
        { text: "Total Confirmed", value: "TotalConfirmed", align: "end" },
        { text: "Total Deaths", value: "TotalDeaths", align: "end" },
        { text: "Total Recovered", value: "TotalRecovered", align: "end" },
      ],
    };
  },
  computed: {
    ...mapState(["filteredCountriesData"]),
    total() {
      const reducer = (acc, cur) => {
        acc.confirmed += cur.TotalConfirmed;
        acc.deaths += cur.TotalDeaths;
        acc.recovered += cur.TotalRecovered;
        return acc;
      };
      return this.filteredCountriesData.reduce(reducer, {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      });
    },
    loading() {
      return !!this.$store.state.loading;
    },
  },
};
</script>

