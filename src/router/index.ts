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
import RecipeDetailsView from "../views/recipes/details/index.vue";
import OrderedFoodListView from "../views/ordered-food/list/index.vue";
import SettingsView from "../views/settings/index.vue";
import CalendarView from "../views/calendar/index.vue";
import IngredientsView from "../views/ingredients/index.vue";

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
          maxWidth: 1100,
        },
      },
      {
        path: ":id",
        name: "RecipeDetails",
        component: RecipeDetailsView,
        meta: {
          maxWidth: 1100,
        },
      },
    ],
  },
  {
    path: "/ingredients",
    name: "IngredientsView",
    component: IngredientsView,
    meta: {
      maxWidth: 1000,
    },
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
      maxWidth: 1900,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
  },
];

const router = createRouter({
  scrollBehavior() {
    return {
      top: 0,
    };
  },
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

  document.getElementById("main-scroll-container")?.scrollTo(0, 0);

  next();
});

export default router;
