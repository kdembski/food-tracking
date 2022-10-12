import ApiService from "@/services/api.service";
import { CalendarState, CalendarDay } from "@/types/calendar";
import { ApiError } from "@/types/api";
import { MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { formatISO } from "date-fns";

const state: CalendarState = {
  isLoadingCalendar: false,
};

const actions: ActionTree<CalendarState, any> = {
  getCalendar(_, { fromDate, toDate }) {
    return new Promise<CalendarDay[]>((resolve, reject) => {
      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/calendar?fromDate=" +
          formatISO(fromDate, { representation: "date" }) +
          "&toDate=" +
          formatISO(toDate, { representation: "date" })
      )
        .then((response: AxiosResponse<CalendarDay[]>) => {
          const dates = response.data.map((date) => {
            date.date = new Date(date.date);
            date.items.sort((a, b) => a.sortOrder - b.sortOrder);
            return date;
          });
          resolve(dates);
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          reject(errorMessage);
        });
    });
  },

  addDateToCalendar(_, data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/calendar", data)
        .then(() => resolve())
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          reject(errorMessage);
        });
    });
  },

  updateDateInCalendar(_, data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/calendar/" + data.id,
        data
      )
        .then(() => resolve())
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          reject(errorMessage);
        });
    });
  },
};

const mutations: MutationTree<CalendarState> = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
