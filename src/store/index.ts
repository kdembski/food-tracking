import { createStore } from "vuex";
import StorageService from "@/services/storage.service";
import user from "./user/index";
import recipe from "./recipe/index";

export default createStore({
  state: {
    isDarkModeEnabled: !!parseInt(
      StorageService.getItem("isDarkModeEnabled") || "0"
    ),
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
  },

  actions: {},

  modules: { user, recipe },
});
