import { shallowMount } from "@vue/test-utils";
import MonthlyCalendar from "./index.vue";

jest.mock("../composables/calendar", () => ({
  useCalendar: () => ({
    loadCalendar: jest.fn(),
    isLoadingCalendar: jest.fn(),
    getCalendarDayByDate: jest.fn(),
    deleteCalendarItem: jest.fn(),
    updateCalendarDay: jest.fn(),
  }),
}));

describe("Monthly Calendar", () => {
  let wrapper: any;

  global.settings.provide = {
    getWeekDays: jest.fn(),
  };

  beforeEach(async () => {
    wrapper = shallowMount(MonthlyCalendar, {
      props: {
        allDatesInMonth: [],
        fullMonthGrid: ["test item"],
      },
      global: global.settings,
    });
  });

  it("Should call getWeeksDays on mounted", async () => {
    expect(wrapper.vm.getWeekDays).toHaveBeenCalledTimes(1);
  });
});
