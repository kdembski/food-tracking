import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

import LoginView from "../views/login/index.vue";
import RecipesListView from "../views/recipes/list/index.vue";
import OrderedFoodListView from "../views/ordered-food/list/index.vue";
import SettingsView from "../views/settings/index.vue";
import CalendarView from "../views/calendar/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: {
      name: "recipesList",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      layout: "plain",
      isPublic: true,
    },
  },
  {
    path: "/recipes",
    name: "recipesList",
    component: RecipesListView,
    meta: {
      isPublic: false,
    },
  },
  {
    path: "/ordered",
    name: "orderedFoodList",
    component: OrderedFoodListView,
    meta: {
      isPublic: false,
    },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView,
    meta: {
      isPublic: false,
      maxWidth: "unset",
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: {
      isPublic: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic: boolean = to.matched.some((record) => record.meta.isPublic);
  const isLoggedIn: boolean = store.getters["user/isLoggedIn"];

  if (!isPublic && !isLoggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  if (isPublic && isLoggedIn) {
    return next(from.fullPath);
  }

  next();
});

export default router;
