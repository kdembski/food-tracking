import ApiService from "@/services/api.service";
import { CalendarDay } from "@/types/calendar";
import { ApiError } from "@/types/api";
import { ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { formatISO } from "date-fns";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "../helpers/error-message";
import { isNil } from "lodash";

const actions: ActionTree<any, any> = {
  getCalendar({ rootState }, { fromDate, toDate }) {
    return new Promise<CalendarDay[]>((resolve, reject) => {
      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/calendar?" +
          helpers.getCalendarRangeQuery(fromDate, toDate)
      )
        .then((response: AxiosResponse<CalendarDay[]>) => {
          const calendar = helpers.getPreparedCalendar(response.data);
          setTimeout(() => resolve(calendar), 500);
        })
        .catch((error: AxiosError<ApiError>) => {
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
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

const helpers = {
  getPreparedCalendar: (calendar: CalendarDay[]) => {
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

  getCalendarRangeQuery: (fromDate: Date, toDate: Date) => {
    return "fromDate=" + formatISO(fromDate) + "&toDate=" + formatISO(toDate);
  },
};

export default {
  namespaced: true,
  actions,
};
