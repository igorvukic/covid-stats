import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared/data.service'
import { GET_COUNTRIES_DATA, FILTER_COUNTRIES_DATA, INCREASE_LOADER, DECREASE_LOADER } from './mutation-types'

Vue.use(Vuex)

const state = () => ({
  countriesData: [],
  filteredCountriesData: [],
  loading: 0,
})

const mutations = {
  [GET_COUNTRIES_DATA](state, countriesData) {
    state.countriesData = countriesData;
    state.filteredCountriesData = countriesData;
  },
  [FILTER_COUNTRIES_DATA](state, filteredCountriesData) {
    state.filteredCountriesData = (Array.isArray(filteredCountriesData) && filteredCountriesData.length) ? filteredCountriesData : state.countriesData;
  },
  [INCREASE_LOADER](state) {
    state.loading += 1;
  },
  [DECREASE_LOADER](state) {
    state.loading -= 1;
  },
};

const actions = {
  async getCountriesData({ commit }) {
    try {
      commit(INCREASE_LOADER);
      const countriesData = await dataService.getCountriesData();
      commit(GET_COUNTRIES_DATA, countriesData);
    } catch (error) {
      console.error(error)
    } finally {
      commit(DECREASE_LOADER);
    }

  },
  filterCountriesData({ commit, state }, { field, fieldValuesList }) {
    const filteredCountriesData = state.countriesData.filter(country => fieldValuesList.includes(country[field]));
    commit(FILTER_COUNTRIES_DATA, filteredCountriesData)
  }
};

const getters = {
  countriesList: state => state.countriesData.map(item => item.Country),
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
