import ApiService from "@/services/api.service";
import { CalendarDay, CalendarState } from "@/types/calendar/calendar";
import { ApiError } from "@/types/api";
import { ActionTree, MutationTree, GetterTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { formatISO, isEqual } from "date-fns";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "../helpers/error-message";
import { isNil } from "lodash";

const state: CalendarState = {
  calendar: null,
  isLoadingCalendar: false,
};

const getters: GetterTree<CalendarState, any> = {
  getCalendarDayByDate: (state) => (date: Date) => {
    return helpers.getCalendarDayByDate(date, state.calendar);
  },
};

const actions: ActionTree<CalendarState, any> = {
  loadCalendar({ rootState, commit }, { allDatesInRange, selectedMembers }) {
    commit("setIsLoadingCalendar", true);

    const fromDate = allDatesInRange[0];
    const toDate = allDatesInRange[allDatesInRange.length - 1];
    selectedMembers = selectedMembers?.join(",");

    return new Promise<void>((resolve, reject) => {
      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/calendar?" +
          helpers.getCalendarRangeQuery(fromDate, toDate, selectedMembers)
      )
        .then((response: AxiosResponse<CalendarDay[]>) => {
          const calendar = helpers.addMissingDaysToCalendar(
            allDatesInRange,
            helpers.sortCalendarItemsAndFixDates(response.data)
          );
          commit("setCalendar", calendar);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        })
        .finally(() => commit("setIsLoadingCalendar", false));
    });
  },

  addCalendarItem(_, data) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/calendar", data)
        .then((response) => resolve(response))
        .catch(() => reject());
    });
  },

  updateCalendarItem(_, data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/calendar/" + data.id,
        data
      )
        .then(() => resolve())
        .catch(() => reject());
    });
  },

  deleteCalendarItem({ rootState }, id) {
    return new Promise<void>((resolve, reject) => {
      ApiService.delete(process.env.VUE_APP_SERVICE_URL + "/calendar/" + id)
        .then(() => {
          rootState.toastNotification.success("Usunięto z kalendarza.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  updateCalendarItemMembers(_, item) {
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
  setCalendar(state, value) {
    state.calendar = value;
  },

  setIsLoadingCalendar(state, value) {
    state.isLoadingCalendar = value;
  },
};

const helpers = {
  getCalendarRangeQuery: (
    fromDate: Date,
    toDate: Date,
    selectedMembers: string
  ) => {
    return (
      "fromDate=" +
      fromDate.getTime() +
      "&toDate=" +
      toDate.getTime() +
      (selectedMembers ? "&members=" + selectedMembers : "")
    );
  },

  sortCalendarItemsAndFixDates: (calendar: CalendarDay[]) => {
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

  addMissingDaysToCalendar: (
    allDatesInRange: Date[],
    calendar: CalendarDay[]
  ) => {
    return allDatesInRange.map((date) => {
      const calendarDay = helpers.getCalendarDayByDate(date, calendar);

      if (calendarDay) {
        return calendarDay;
      }

      return {
        date,
        items: [],
      };
    });
  },

  getCalendarDayByDate: (date: Date, calendar: CalendarDay[] | null) => {
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
