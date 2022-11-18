import flushPromises from "flush-promises";
import { provide, computed, nextTick } from "vue";
import { mount as composableMount } from "vue-composable-tester";
import { createStore } from "vuex";
import { useCalendar } from "./calendar";

let toastSuccess: any;
let toastError: any;
jest.mock("@/composables/toast-notification", () => ({
  useToastNotification: () => ({
    success: toastSuccess,
    error: toastError,
  }),
}));

describe("Calendar View", () => {
  let calendarComposable: any;
  let store: any;
  let state: any;
  let actions: any;
  let getters: any;
  const allDatesInRange = computed(() => [
    new Date(2000, 1, 1),
    new Date(2000, 1, 2),
    new Date(2000, 1, 3),
    new Date(2000, 1, 4),
    new Date(2000, 1, 5),
  ]);
  let calendar: any;

  beforeEach(async () => {
    calendar = [
      {
        date: new Date(2000, 1, 1),
        items: [
          {
            id: 1,
            recipeId: 1,
            isRecipe: true,
            portions: 2,
            name: "test name",
            tags: "tag1,tag2",
            sortOrder: 1,
          },
          {
            id: 2,
            recipeId: 2,
            isRecipe: true,
            portions: 2,
            name: "test name2",
            tags: "tag1,tag2",
            sortOrder: 2,
          },
          {
            id: 3,
            orderedFoodId: 1,
            isOrderedFood: true,
            portions: 2,
            name: "test name3",
            tags: "tag1,tag2",
            sortOrder: 3,
          },
        ],
      },
    ];

    state = {
      calendar,
      isLoadingCalendar: false,
    };
    actions = {
      loadCalendar: jest.fn(),
      addDateToCalendar: jest.fn(),
      deleteDateFromCalendar: jest.fn(),
      updateDateInCalendar: jest.fn(),
    };
    getters = {
      getCalendarDayByDate: () => () => calendar[0],
    };

    store = createStore({
      modules: {
        calendar: {
          namespaced: true,
          state,
          actions,
          getters,
        },
      },
    });

    toastSuccess = jest.fn();
    toastError = jest.fn();

    calendarComposable = composableMount(() => useCalendar(allDatesInRange), {
      provider: () => {
        provide("store", store);
      },
    }).result;
  });

  it("Should load calendar on before mount", async () => {
    expect(actions.loadCalendar).toBeCalledTimes(1);
  });

  it("Should retrun value from getCalendarDayByDate getter on getCalendarDayByDate method call", async () => {
    expect(calendarComposable.getCalendarDayByDate("test")).toEqual(
      calendar[0]
    );
  });

  it("Should dispatch addDateToCalendar action on addCalendarItem method call", async () => {
    await calendarComposable.addCalendarItem({ item: "test" }, "test");
    expect(actions.addDateToCalendar).toHaveBeenCalledTimes(1);
    expect(actions.addDateToCalendar).toHaveBeenCalledWith(expect.any(Object), {
      item: "test",
      date: "test",
    });
  });

  it("Should push cloned element to calendarDay items on cloneCalendarItem method call", async () => {
    actions.addDateToCalendar.mockImplementation(() =>
      Promise.resolve({ data: { insertId: 1 } })
    );
    await calendarComposable.cloneCalendarItem({});
    await nextTick();
    expect(calendar[0].items[3]).toEqual({ id: 1 });
    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(toastSuccess).toHaveBeenCalledWith("Zduplikowano.");
  });

  it("Should show error toast notification if addDateToCalendar is rejected", async () => {
    actions.addDateToCalendar.mockImplementation(() => Promise.reject());
    await calendarComposable.cloneCalendarItem({});
    await flushPromises();
    expect(toastError).toHaveBeenCalledTimes(1);
    expect(toastError).toHaveBeenCalledWith("Duplikowanie nie powiodło się.");
  });

  it("Should delete item from dat items and dispatch deleteDateFromCalendar on deleteCalendarItem call", async () => {
    await calendarComposable.deleteCalendarItem(4, "test");
    await nextTick();
    expect(actions.deleteDateFromCalendar).toHaveBeenCalledTimes(0);

    await calendarComposable.deleteCalendarItem(1, "test");
    await nextTick();
    expect(actions.deleteDateFromCalendar).toHaveBeenCalledTimes(1);
    expect(actions.deleteDateFromCalendar).toHaveBeenCalledWith(
      expect.any(Object),
      1
    );
    expect(calendar[0].items.length).toEqual(2);
  });

  it("Should dispatch updateDateInCalendar on updateCalendarItem call", async () => {
    await calendarComposable.updateCalendarItem({ item: "test" }, "test");
    expect(actions.updateDateInCalendar).toHaveBeenCalledTimes(1);
    expect(actions.updateDateInCalendar).toHaveBeenCalledWith(
      expect.any(Object),
      {
        item: "test",
        date: "test",
      }
    );
  });

  it("Should dispatch updateDateInCalendar for every item in day on updateCalendarDay call", async () => {
    actions.updateDateInCalendar.mockImplementation(() => Promise.resolve());
    await calendarComposable.updateCalendarDay(calendar[0]);
    await flushPromises();

    expect(actions.updateDateInCalendar).toHaveBeenCalledTimes(3);
    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(toastSuccess).toHaveBeenCalledWith(
      "Kalendarz zaktualizowany pomyślnie!"
    );
  });

  it("Should show error notification if on updateCalendarDay call any of updateDateInCalendar fails", async () => {
    actions.updateDateInCalendar.mockImplementation(() => Promise.reject());
    await calendarComposable.updateCalendarDay(calendar[0]);
    await flushPromises();

    expect(toastError).toHaveBeenCalledTimes(1);
    expect(toastError).toHaveBeenCalledWith(
      "Aktualizacja kalendarza nie powiodła się."
    );
  });
});
