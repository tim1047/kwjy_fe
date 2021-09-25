import Vue from "vue";
import VueRouter from "vue-router";
import AccountMain from "../views/AccountMain.vue";
import AccountDtl from "../views/AccountDtl.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AccountMain",
    component: AccountMain,
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
