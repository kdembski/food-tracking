import { createStore } from "vuex";
import StorageService from "@/services/storage.service";
import user from "./user/index";
import recipe from "./recipe/index";
import orderedFood from "./ordered-food/index";
import calendar from "./calendar/index";

export default createStore({
  state: {
    theme: StorageService.getItem("theme") || "light",
    primaryColor: StorageService.getItem("primaryColor") || "orange",
    mainContainerScrollValue: 0,
  },

  getters: {
    isDarkModeEnabled: (state) => {
      return state.theme === "dark";
    },
  },

  mutations: {
    setTheme(state, value) {
      StorageService.setItem("theme", value);
      state.theme = value;
    },

    setPrimaryColor(state, value) {
      StorageService.setItem("theme", value);
      state.theme = value;
    },

    setMainContainerScrollValue(state, value) {
      state.mainContainerScrollValue = value;
    },
  },
  actions: {},
  modules: { user, recipe, orderedFood, calendar },
});
