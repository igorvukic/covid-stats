import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared/data.service'
import { GET_COUNTRIES_DATA, FILTER_COUNTRIES_DATA } from './mutation-types'

Vue.use(Vuex)

const state = () => ({
  countriesData: [],
  filteredCountriesData: [],
})

const mutations = {
  [GET_COUNTRIES_DATA](state, countriesData){
    state.countriesData = countriesData;
    state.filteredCountriesData = countriesData;
  },
  [FILTER_COUNTRIES_DATA](state, filteredCountriesData){
    state.filteredCountriesData = Array.isArray(filteredCountriesData) && filteredCountriesData.length ?  filteredCountriesData : state.countriesData;
  }
};

const actions = {
  async getCountriesData({commit}) {
    const countriesData = await dataService.getCountriesData();
    commit(GET_COUNTRIES_DATA, countriesData);
  },
  filterCountriesData({commit, state}, {field, fieldValuesList}){
    const filteredCountriesData = state.countriesData.filter(country=> fieldValuesList.includes(country[field]));
    commit(FILTER_COUNTRIES_DATA, filteredCountriesData)
  }
};

const getters = {
  countriesList: state => state.countriesData.map(item => item.Country),
  countiresDataByName: state => countriesNameList => state.countriesData.filter(country=> countriesNameList.includes(country.Country)),
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
