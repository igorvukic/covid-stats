<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="countriesData"
      class="elevation-1"
      disable-pagination
      hide-default-footer
      :loading="loading"
      loading-text="Loading countries data..."
    >
      <template slot="body.append">
        <tr class="pink--text">
          <th class="title">Totals</th>
          <th class="title">{{ sumField("activeCases") }}</th>
          <th class="title">{{ sumField("deathCases") }}</th>
          <th class="title">{{ sumField("recoveryCases") }}</th>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { COUNTRY, ACTIVE_CASES, DEATH_CASES, RECOVERED_CASES} from '../shared/table-fields';


export default {
  data() {
    return {
      headers: [
        { text: "Country", value: COUNTRY },
        { text: "Total Confirmed", value: ACTIVE_CASES },
        { text: "Total Deaths", value: DEATH_CASES },
        { text: "Total Recovered", value: RECOVERED_CASES },
      ],
      loading: false,
    };
  },
  computed: {
    ...mapState(["countriesData"]),
  },
  methods: {
    ...mapActions(["getCountriesData"]),
    async loadCountriesData() {
      this.loading = true;
      await this.getCountriesData();
      this.loading = false;
    },
    sumField(field) {
      this.countriesData.reduce(
        (accumulator, currentValue) => (currentValue += accumulator[field])
      );
    },
  },
  async created() {
    await this.loadCountriesData();
  },
};
</script>

