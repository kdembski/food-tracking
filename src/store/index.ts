import { createStore } from "vuex";
import StorageService from "@/services/storage.service";
import user from "./user/index";
import recipe from "./recipe/index";
import orderedFood from "./ordered-food/index";
import calendar from "./calendar/index";
import { State } from "@/types/store";

export default createStore<State>({
  state: {
    theme: StorageService.getItem("theme") || "light",
    primaryColor: StorageService.getItem("primaryColor") || "orange",
    mainContainerScrollValue: 0,
    toastNotifications: [],
    isTooltipOpen: false,
    tooltipConfig: {},
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

    unshiftToastNotification(state, value) {
      state.toastNotifications.unshift(value);
    },

    popToastNotification(state) {
      state.toastNotifications.pop();
    },

    spliceToastNotification(state, index) {
      state.toastNotifications.splice(index, 1);
    },

    setIsTooltipOpen(state, value) {
      state.isTooltipOpen = value;
    },

    setTooltipConfig(state, value) {
      state.tooltipConfig = value;
    },
  },

  actions: {},

  modules: { user, recipe, orderedFood, calendar },
});
