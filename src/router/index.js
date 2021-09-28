import Vue from "vue";
import VueRouter from "vue-router";
import AccountMain from "../views/Account/AccountMain.vue";
import AccountDtl from "../views/Account/AccountDtl.vue";
import DashboardLayout from '@/views/Layout/DashboardLayout.vue';


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
  },
  {
    path: "/test",
    name: "DashboardLayout",
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
