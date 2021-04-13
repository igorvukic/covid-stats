import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared/data.service'
import { GET_COUNTRIES_DATA } from './mutation-types'

Vue.use(Vuex)

const state = () => ({
  countriesData: [],
})

const mutations = {
  [GET_COUNTRIES_DATA](state, countriesData){
    state.countriesData = countriesData;
  }
};

const actions = {
  async getCountriesData({commit}) {
    const countriesData = await dataService.getCountriesData();
    commit(GET_COUNTRIES_DATA, countriesData);
  }

};

const getters ={

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
