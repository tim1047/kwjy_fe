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
    },
    apiUrl: 'http://146.56.159.174:8000/account_book'
  },
  mutations: {
    setMonth: function(state, payload) {
      state.date.curMonth = payload
      if(payload == 1){
        state.date.prevMonth = 12
      } else{
        state.date.prevMonth = payload - 1
      }
    }
  },
  actions: {},
  modules: {},
});
