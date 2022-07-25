import { createStore } from "vuex";
import StorageService from "@/services/storage.service";
import user from "./user/index";
import recipe from "./recipe/index";
import orderedFood from "./ordered-food/index";

export default createStore({
  state: {
    theme: StorageService.getItem("theme") || "light",
    primaryColor: StorageService.getItem("primaryColor") || "orange",
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
  },
  actions: {},
  modules: { user, recipe, orderedFood },
});
