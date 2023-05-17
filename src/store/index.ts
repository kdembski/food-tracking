import { ActionContext, createStore } from "vuex";
import { AxiosError } from "axios";
import { ApiError, ErrorCodes } from "@/types/api";
import { State } from "@/types/store";
import StorageService from "@/services/storage.service";
import user from "./user/index";
import recipe from "./recipe/index";
import orderedFood from "./ordered-food/index";
import calendar from "./calendar/index";
import member from "./member";
import ingredient from "./ingredient";
import shopping from "./shopping";

export default createStore<State>({
  state: {
    theme: StorageService.getItem("theme") || "light",
    primaryColor: StorageService.getItem("primaryColor") || "orange",
    mainContainerScrollValue: 0,
    toastNotifications: [],
    isTooltipOpen: false,
    tooltipConfig: {},
    isMobileDropdownOpen: false,
    toastNotification: null,
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
      StorageService.setItem("primaryColor", value);
      state.primaryColor = value;
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

    setIsMobileDropdownOpen(state, value) {
      state.isMobileDropdownOpen = value;
    },
  },

  actions: {
    handleDefaultError({ state }, error: AxiosError<ApiError>) {
      const errorMessage: string | undefined =
        error.response?.data?.message || error.code;

      state.toastNotification?.error("Wystąpił błąd: " + errorMessage + ".");
    },

    handleComplexError(
      { commit, dispatch }: ActionContext<State, State>,
      {
        error,
        module,
      }: { error: AxiosError<ApiError<unknown | string>>; module: string }
    ) {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message;

      if (code !== ErrorCodes.COMPLEX_ERROR) {
        dispatch("handleDefaultError", error);
        return;
      }

      commit(module + "/setErrors", message);
    },
  },

  modules: {
    user,
    recipe,
    orderedFood,
    calendar,
    member,
    ingredient,
    shopping,
  },
});
