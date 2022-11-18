import { nextTick } from "vue";
import flushPromises from "flush-promises";
import { shallowMount } from "@vue/test-utils";
import CalendarView from "./index.vue";
import { useCalendarModes } from "@/components/controls/calendar-mode/composables/calendar-modes";

let incrementDate: any;
let decrementDate: any;
jest.mock("@/composables/date-helpers/index", () => ({
  useDateHelpers: () => ({
    incrementDate,
    decrementDate,
    getDateRange: () => false,
    allDatesInWeek: [],
    allDatesInMonth: [],
    fullMonthGrid: [],
  }),
}));

describe("Calendar View", () => {
  let wrapper: any = null;
  let monthlyCalendar: any;
  let weeklyCalendar: any;

  beforeEach(async () => {
    decrementDate = jest.fn();
    incrementDate = jest.fn();

    wrapper = shallowMount(CalendarView, {
      global: global.settings,
    });

    monthlyCalendar = {
      loadMonthlyCalendar: jest.fn(),
    };
    weeklyCalendar = {
      loadWeeklyCalendar: jest.fn(),
    };
  });

  it("Should load calendar and decrement date on left arrow click", async () => {
    wrapper.vm.weeklyCalendar = weeklyCalendar;
    await wrapper.vm.onArrowLeftClick();
    await flushPromises();
    expect(decrementDate).toHaveBeenCalledTimes(1);
    expect(weeklyCalendar.loadWeeklyCalendar).toHaveBeenCalledTimes(1);
  });

  it("Should load calendar and increment date on right arrow click", async () => {
    const { calendarModes } = useCalendarModes();
    wrapper.vm.calendarMode = calendarModes.MONTHLY;
    await nextTick();

    wrapper.vm.monthlyCalendar = monthlyCalendar;
    await wrapper.vm.onArrowRightClick();
    await flushPromises();
    expect(incrementDate).toHaveBeenCalledTimes(1);
    expect(monthlyCalendar.loadMonthlyCalendar).toHaveBeenCalledTimes(1);
  });
});
