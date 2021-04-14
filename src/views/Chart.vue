<template>
  <v-container>
    <v-skeleton-loader
      type="image"
      v-if="loading"
      height="500"
    ></v-skeleton-loader>
    <vue-frappe
      id="test"
      v-else
      :labels="chartData.labels"
      type="axis-mixed"
      :height="500"
      :colors="['#01579B', '#0288D1', '#29B6F6']"
      :dataSets="chartData.mappedData"
    >
    </vue-frappe>
  </v-container>
</template>
<script>
import { VueFrappe } from "vue2-frappe";
import { mapState } from "vuex";

export default {
  components: {
    VueFrappe,
  },
  computed: {
    ...mapState(["filteredCountriesData"]),
    chartData() {
      const mappedData = [
        {
          name: "Total Confirmed",
          chartType: "bar",
          values: [],
          field: "TotalConfirmed",
        },
        {
          name: "Total Deaths",
          chartType: "bar",
          values: [],
          field: "TotalDeaths",
        },
        {
          name: "Total Recovered",
          chartType: "bar",
          values: [],
          field: "TotalRecovered",
        },
      ];
      const labels = [];
      this.filteredCountriesData.forEach((country) => {
        labels.push(country.Country);
        mappedData.forEach((category) =>
          category.values.push(country[category.field])
        );
      });
      return { labels, mappedData };
    },
    loading() {
      return !!this.$store.state.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-skeleton-loader__image.v-skeleton-loader__bone {
  height: 500px;
}
</style>


