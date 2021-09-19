import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false;

Vue.filter("comma", val =>{
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
