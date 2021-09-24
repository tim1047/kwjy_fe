import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    date: {
      curDate: new Date(),
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth() + 1,
      prevMonth: new Date().getMonth()
    }
  },
  mutations: {
    setMonth: function(state, payload) {
      state.date.curMonth = payload
      state.date.prevMonth = payload - 1
    }
  },
  actions: {},
  modules: {},
});
