import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterView,
} from "vue-router";
import store from "@/store";
import { h } from "vue";

import LoginView from "../views/login/index.vue";
import RecipesListView from "../views/recipes/list/index.vue";
import NewRecipeView from "../views/recipes/new/index.vue";
import EditRecipeView from "../views/recipes/edit/index.vue";
import OrderedFoodListView from "../views/ordered-food/list/index.vue";
import SettingsView from "../views/settings/index.vue";
import CalendarView from "../views/calendar/index.vue";
import IngredientsListView from "../views/ingredients/list/index.vue";

const Recipes = {
  name: "Recipes",
  render: () => h(RouterView),
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: {
      name: "Calendar",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      layout: "plain",
      isPublic: true,
    },
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
    children: [
      {
        path: "",
        name: "RecipesList",
        component: RecipesListView,
      },
      {
        path: "new",
        name: "AddRecipe",
        component: NewRecipeView,
        meta: {
          maxWidth: 600,
        },
      },
      {
        path: ":id",
        name: "EditRecipe",
        component: EditRecipeView,
        meta: {
          maxWidth: 600,
        },
      },
    ],
  },
  {
    path: "/ingredients",
    name: "IngredientsListView",
    component: IngredientsListView,
  },
  {
    path: "/ordered",
    name: "OrderedFoodList",
    component: OrderedFoodListView,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarView,
    meta: {
      maxWidth: "unset",
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
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
