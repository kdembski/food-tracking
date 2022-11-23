import { shallowMount } from "@vue/test-utils";
import WeeklyCalendar from "./index.vue";

jest.mock("../composables/calendar", () => ({
  useCalendar: () => ({
    loadCalendar: jest.fn(),
    isLoadingCalendar: jest.fn(),
    getCalendarDayByDate: jest.fn(),
    deleteCalendarItem: jest.fn(),
    updateCalendarDay: jest.fn(),
  }),
}));

describe("Weekly Calendar", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(WeeklyCalendar, {
      props: {
        allDatesInWeek: [],
      },
      global: global.settings,
    });
  });

  it("Should editedItem and open edit modal on openEditModal call", async () => {
    expect(wrapper.vm.isEditModalOpen).toBe(false);

    await wrapper.vm.openEditModal({ item: "item" }, new Date(2000, 1, 1));
    expect(wrapper.vm.editedItem).toEqual({ item: "item" });
    expect(wrapper.vm.editedItemDate).toEqual(new Date(2000, 1, 1));
    expect(wrapper.vm.isEditModalOpen).toBe(true);
  });
});
