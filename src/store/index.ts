import { createStore } from "vuex";
import StorageService from "@/services/storage.service";
import user from "./user/index";
import recipe from "./recipe/index";
import orderedFood from "./ordered-food/index";

export default createStore({
  state: {
    isDarkModeEnabled: !!parseInt(
      StorageService.getItem("isDarkModeEnabled") || "0"
    ),
    isDefaultLayoutContentScrollable: true,
  },

  getters: {},

  mutations: {
    toggleDarkMode(state) {
      state.isDarkModeEnabled = !state.isDarkModeEnabled;
      StorageService.setItem(
        "isDarkModeEnabled",
        state.isDarkModeEnabled ? "1" : "0"
      );
    },
    setDefaultLayoutContentScrollable(state, value) {
      state.isDefaultLayoutContentScrollable = value;
    },
  },

  actions: {},

  modules: { user, recipe, orderedFood },
});
