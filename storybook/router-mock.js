import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
