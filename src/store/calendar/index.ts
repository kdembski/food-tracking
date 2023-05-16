import ApiService from "@/services/api.service";
import { CalendarDay, CalendarState } from "@/types/calendar/calendar";
import { ApiError } from "@/types/api";
import { ActionTree, MutationTree, GetterTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { isEqual } from "date-fns";
import { isNil } from "lodash";

const state: CalendarState = {
  days: null,
  isLoadingDays: false,

  isAddToCalendarModalOpen: false,
  addedRecipe: null,
  addedOrderedFood: null,
};

const getters: GetterTree<CalendarState, any> = {
  getDayByDate: (state) => (date: Date) => {
    return helpers.getDayByDate(date, state.days);
  },
};

const actions: ActionTree<CalendarState, any> = {
  loadDays({ commit, dispatch }, { allDatesInRange, selectedMembers }) {
    commit("setIsLoadingDays", true);

    const fromDate = allDatesInRange[0];
    const toDate = allDatesInRange[allDatesInRange.length - 1];
    selectedMembers = selectedMembers?.join(",");

    return new Promise<void>((resolve) => {
      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/calendar?" +
          helpers.getCalendarQuery(fromDate, toDate, selectedMembers)
      )
        .then((response: AxiosResponse<CalendarDay[]>) => {
          const days = helpers.addMissingDays(
            allDatesInRange,
            helpers.sortItemsAndFixDates(response.data)
          );
          commit("setDays", days);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => commit("setIsLoadingDays", false));
    });
  },

  createItem(_, data) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/calendar", data)
        .then((response) => resolve(response))
        .catch(() => reject());
    });
  },

  updateItem(_, data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/calendar/" + data.id,
        data
      )
        .then(() => resolve())
        .catch(() => reject());
    });
  },

  deleteItem({ dispatch, rootState }, id) {
    return new Promise<void>((resolve) => {
      ApiService.delete(process.env.VUE_APP_SERVICE_URL + "/calendar/" + id)
        .then(() => {
          rootState.toastNotification.success("Usunięto z kalendarza.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  updateItemMembers(_, item) {
    return new Promise<void>((resolve, reject) => {
      ApiService.patch(
        process.env.VUE_APP_SERVICE_URL + "/calendar/" + item.id + "/members",
        item.members
      )
        .then(() => resolve())
        .catch(() => reject());
    });
  },
};

const mutations: MutationTree<CalendarState> = {
  setDays(state, value) {
    state.days = value;
  },

  setIsLoadingDays(state, value) {
    state.isLoadingDays = value;
  },

  setIsAddToCalendarModalOpen(state, value) {
    state.isAddToCalendarModalOpen = value;
  },

  setAddedRecipe(state, value) {
    state.addedRecipe = value;
  },

  setAddedOrderedFood(state, value) {
    state.addedOrderedFood = value;
  },
};

const helpers = {
  getCalendarQuery: (fromDate: Date, toDate: Date, selectedMembers: string) => {
    return (
      "fromDate=" +
      fromDate.getTime() +
      "&toDate=" +
      toDate.getTime() +
      (selectedMembers ? "&members=" + selectedMembers : "")
    );
  },

  sortItemsAndFixDates: (calendar: CalendarDay[]) => {
    return calendar.map((day) => {
      day.date = new Date(day.date);
      day.items.sort((a, b) => {
        if (isNil(a.sortOrder)) {
          return 1;
        }
        if (isNil(b.sortOrder)) {
          return -1;
        }
        return a.sortOrder - b.sortOrder;
      });
      return day;
    });
  },

  addMissingDays: (allDatesInRange: Date[], calendar: CalendarDay[]) => {
    return allDatesInRange.map((date) => {
      const calendarDay = helpers.getDayByDate(date, calendar);

      if (calendarDay) {
        return calendarDay;
      }

      return {
        date,
        items: [],
      };
    });
  },

  getDayByDate: (date: Date, calendar: CalendarDay[] | null) => {
    return calendar?.find((day) => isEqual(day.date, date));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
