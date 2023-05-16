import flushPromises from "flush-promises";
import { CalendarDay } from "@/types/calendar/calendar";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import calendar from "@/store/calendar/index";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Calendar Store Module", () => {
  let store: any;
  let actions: any;
  let daysMock: CalendarDay[];
  let allDatesInRange: Date[];
  let toastNotification: any;

  beforeEach(async () => {
    allDatesInRange = [
      new Date(2000, 1, 1),
      new Date(2000, 1, 2),
      new Date(2000, 1, 3),
    ];

    daysMock = [
      {
        date: new Date(2000, 1, 1),
        items: [
          {
            id: 1,
            recipeId: 1,
            sortOrder: 1,
            orderedFoodId: undefined,
            name: "test name 1",
            tags: "tag1,tag2",
            members: [1, 2],
          },
          {
            id: 2,
            recipeId: 2,
            sortOrder: 0,
            orderedFoodId: undefined,
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
            orderedFoodId: undefined,
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

    actions = {
      handleDefaultError: jest.fn(),
      handleComplexError: jest.fn(),
    };

    store = createStore({
      state: {
        toastNotification,
      },
      actions,
      modules: {
        calendar,
      },
    });
  });

  it("Should set days to state on successful loadDays action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: daysMock }));
    await store.dispatch("calendar/loadDays", {
      allDatesInRange,
      selectedMembers: [1],
    });
    expect(store.state.calendar.isLoadingDays).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/calendar?fromDate=949359600000&toDate=949532400000&members=1"
    );
    expect(store.state.calendar.days).toEqual([
      ...daysMock,
      { date: new Date(2000, 1, 3), items: [] },
    ]);
    expect(store.state.calendar.isLoadingDays).toBe(false);
  });

  it("Should show error notification on failed loadDays action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("calendar/loadDays", {
      allDatesInRange,
      selectedMembers: [],
    });

    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should send post request on createItem dispatch", async () => {
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/createItem", { data: "data" });
    await flushPromises();
    expect(mockAxiosPost).toHaveBeenCalledWith("service/calendar", {
      data: "data",
    });

    mockAxiosPost.mockImplementation(() => Promise.reject());
    await expect(store.dispatch("calendar/createItem")).rejects.toEqual(
      undefined
    );
  });

  it("Should send put request on updateItem dispatch", async () => {
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/updateItem", { id: 1 });
    await flushPromises();
    expect(mockAxiosPut).toHaveBeenCalledWith("service/calendar/1", { id: 1 });

    mockAxiosPut.mockImplementation(() => Promise.reject());
    await expect(
      store.dispatch("calendar/updateItem", { id: 1 })
    ).rejects.toEqual(undefined);
  });

  it("Should send delete request on deleteItem dispatch", async () => {
    mockAxiosDelete.mockImplementation(() => Promise.resolve());
    store.dispatch("calendar/deleteItem", 1);
    await flushPromises();
    expect(mockAxiosDelete).toHaveBeenCalledWith("service/calendar/1");
    expect(toastNotification.success).toHaveBeenCalledTimes(1);

    mockAxiosDelete.mockImplementation(() => Promise.reject("error"));
    store.dispatch("calendar/deleteItem", 1);
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should send request on updateItemMembers dispatch", async () => {
    mockAxiosPatch.mockImplementation(() => Promise.resolve());
    await store.dispatch("calendar/updateItemMembers", {
      id: 1,
      members: [1],
    });
    await flushPromises();
    expect(mockAxiosPatch).toHaveBeenCalledWith("service/calendar/1/members", [
      1,
    ]);

    mockAxiosPatch.mockImplementation(() => Promise.reject());
    await expect(
      store.dispatch("calendar/updateItemMembers", { id: 1 })
    ).rejects.toEqual(undefined);
  });

  it("Should return calendarDay on getDayByDate getter call", async () => {
    await store.commit("calendar/setDays", daysMock);
    expect(
      store.getters["calendar/getDayByDate"](new Date(2000, 1, 1))
    ).toEqual(daysMock[0]);
  });
});
