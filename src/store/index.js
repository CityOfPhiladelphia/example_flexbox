import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    refineOpen: false,
  },
  mutations: {
    setRefineOpen(state, payload) {
      state.refineOpen = payload;
    },
  },
  actions: {
  },
  modules: {
  }
});
