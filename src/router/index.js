import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AccountDtl from "../views/AccountDtl.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/accountDtl",
    name: "AccountDtl",
    component: AccountDtl,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
