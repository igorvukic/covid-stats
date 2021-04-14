<template>
  <vue-frappe
    id="test"
    :labels="chartData.labels"
    title="My Awesome Chart"
    type="axis-mixed"
    :height="500"
    :colors="['#01579B', '#0288D1', '#29B6F6']"
    :dataSets="chartData.mappedData"
  >
  </vue-frappe>
</template>
<script>
import { VueFrappe } from 'vue2-frappe';
import { mapState } from 'vuex';

export default {
  components: {
    VueFrappe,
  },
  data() {
    return {
    //   labels:[
    //   '12am-3am',
    //   '3am-6am',
    //   '6am-9am',
    //   '9am-12pm',
    //   '12pm-3pm',
    //   '3pm-6pm',
    //   '6pm-9pm',
    //   '9pm-12am',
    // ],
    //   chartData: [
    //     {
    //       name: "Some Data",
    //       chartType: "bar",
    //       values: [25, 40, 30, 35, 8, 52, 17, -4],
    //     },
    //     {
    //       name: "Another Set",
    //       chartType: "bar",
    //       values: [25, 50, -10, 15, 18, 32, 27, 14],
    //     },
    //     {
    //       name: "Yet Another",
    //       chartType: "bar",
    //       values: [15, 20, -3, -15, 58, 12, -17, 37],
    //     },
    //   ],
    };
  },
  computed: {
    ...mapState(["filteredCountriesData"]),
    chartData(){
      const mappedData = [
        {
          name: 'Total Confirmed',
          chartType: 'bar',
          values: [],
          field: 'TotalConfirmed'
        },
        {
          name: 'Total Deaths',
          chartType: 'bar',
          values: [],
          field: 'TotalDeaths'
        },
        {
          name: 'Total Recovered',
          chartType: 'bar',
          values: [],
          field: 'TotalRecovered'
        }

      ]
      const labels = [];
      this.filteredCountriesData.forEach(country => {
        labels.push(country.Country);
        mappedData.map(category => category.values.push(country[category.field]))
      }
      );

      return {labels, mappedData}
    }
  }

};
</script>

