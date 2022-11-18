import ApiService from "@/services/api.service";
import { CalendarDay, CalendarState } from "@/types/calendar";
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
  loadCalendar({ rootState, commit }, allDatesInRange) {
    commit("setIsLoadingCalendar", true);

    const fromDate = allDatesInRange[0];
    const toDate = allDatesInRange[allDatesInRange.length - 1];

    return new Promise<void>((resolve, reject) => {
      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/calendar?" +
          helpers.getCalendarRangeQuery(fromDate, toDate)
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
        .finally(() =>
          setTimeout(() => commit("setIsLoadingCalendar", false), 500)
        );
    });
  },

  addDateToCalendar(_, data) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/calendar", data)
        .then((response) => resolve(response))
        .catch(() => reject());
    });
  },

  updateDateInCalendar(_, data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/calendar/" + data.id,
        data
      )
        .then(() => resolve())
        .catch(() => reject());
    });
  },

  deleteDateFromCalendar({ rootState }, id) {
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
  getCalendarRangeQuery: (fromDate: Date, toDate: Date) => {
    return "fromDate=" + formatISO(fromDate) + "&toDate=" + formatISO(toDate);
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
