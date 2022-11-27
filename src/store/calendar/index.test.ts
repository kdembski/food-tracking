import flushPromises from "flush-promises";
import { CalendarDay } from "@/types/calendar";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import calendar from "./index";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Calendar Store Module", () => {
  let store: any;
  let calendarMock: CalendarDay[];
  let allDatesInRange: Date[];
  let toastNotification: any;

  beforeEach(async () => {
    allDatesInRange = [
      new Date(2000, 1, 1),
      new Date(2000, 1, 2),
      new Date(2000, 1, 3),
    ];

    calendarMock = [
      {
        date: new Date(2000, 1, 1),
        items: [
          {
            id: 1,
            recipeId: 1,
            sortOrder: 1,
            isRecipe: true,
            name: "test name 1",
            tags: "tag1,tag2",
            members: [1, 2],
          },
          {
            id: 2,
            recipeId: 2,
            sortOrder: 0,
            isRecipe: true,
            name: "test name 2",
            tags: "tag1,tag2",
            members: [1, 2],
          },
        ],
      },
      {
        date: new Date(2000, 1, 2),
        items: [
          {
            id: 292,
            recipeId: 52,
            sortOrder: 0,
            isRecipe: true,
            name: "test name 3",
            tags: "tag1,tag2",
            members: [1, 2],
          },
        ],
      },
    ];

    toastNotification = {
      success: jest.fn(),
      error: jest.fn(),
    };

    store = createStore({
      state: {
        toastNotification,
      },
      modules: {
        calendar,
      },
    });
  });

  it("Should set calendar to state on successful loadCalendar action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: calendarMock })
    );
    await store.dispatch("calendar/loadCalendar", {
      allDatesInRange,
      selectedMembers: [1],
    });
    expect(store.state.calendar.isLoadingCalendar).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/calendar?fromDate=2000-02-01T00:00:00+01:00&toDate=2000-02-03T00:00:00+01:00&members=1"
    );
    expect(store.state.calendar.calendar).toEqual([
      ...calendarMock,
      { date: new Date(2000, 1, 3), items: [] },
    ]);
    expect(store.state.calendar.isLoadingCalendar).toBe(false);
  });

  it("Should show error notification on failed loadCalendar action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("calendar/loadCalendar", {
        allDatesInRange,
        selectedMembers: [],
      })
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should send request on addCalendarItem dispatch", async () => {
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/addCalendarItem", { data: "data" });
    await flushPromises();
    expect(mockAxiosPost).toHaveBeenCalledWith("service/calendar", {
      data: "data",
    });

    mockAxiosPost.mockImplementation(() => Promise.reject());
    await expect(store.dispatch("calendar/addCalendarItem")).rejects.toEqual(
      undefined
    );
  });

  it("Should send request on updateCalendarItem dispatch", async () => {
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/updateCalendarItem", { id: 1 });
    await flushPromises();
    expect(mockAxiosPut).toHaveBeenCalledWith("service/calendar/1", { id: 1 });

    mockAxiosPut.mockImplementation(() => Promise.reject());
    await expect(
      store.dispatch("calendar/updateCalendarItem", { id: 1 })
    ).rejects.toEqual(undefined);
  });

  it("Should send request on deleteCalendarItem dispatch", async () => {
    mockAxiosDelete.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/deleteCalendarItem", 1);
    await flushPromises();
    expect(mockAxiosDelete).toHaveBeenCalledWith("service/calendar/1");
    expect(toastNotification.success).toHaveBeenCalledTimes(1);

    mockAxiosDelete.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("calendar/deleteCalendarItem", 1)
    ).rejects.toEqual("error");
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
  });

  it("Should send request on updateCalendarItemMembers dispatch", async () => {
    mockAxiosPatch.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/updateCalendarItemMembers", {
      id: 1,
      members: [1],
    });
    await flushPromises();
    expect(mockAxiosPatch).toHaveBeenCalledWith("service/calendar/1/members", [
      1,
    ]);

    mockAxiosPatch.mockImplementation(() => Promise.reject());
    await expect(
      store.dispatch("calendar/updateCalendarItemMembers", { id: 1 })
    ).rejects.toEqual(undefined);
  });

  it("Should return calendarDay on getCalendarDayByDate getter call", async () => {
    await store.commit("calendar/setCalendar", calendarMock);
    expect(
      store.getters["calendar/getCalendarDayByDate"](new Date(2000, 1, 1))
    ).toEqual(calendarMock[0]);
  });
});
