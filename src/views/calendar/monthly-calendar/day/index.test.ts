import { shallowMount } from "@vue/test-utils";
import MonthlyCalendarDay from "./index.vue";

describe("Monthly Calendar Day", () => {
  let wrapper: any;

  beforeEach(async () => {
    global.settings.provide = {
      getFormattedDate: jest.fn(),
    };

    wrapper = shallowMount(MonthlyCalendarDay, {
      props: {
        calendarDay: {},
        date: new Date(2000, 1, 1),
        updateCalendarDay: jest.fn(),
      },
      global: global.settings,
    });
  });

  it("Should updateCalendarDate on onMove call", async () => {
    await wrapper.vm.onMove();
    expect(wrapper.vm.updateCalendarDay).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.updateCalendarDay).toHaveBeenCalledWith({});
  });

  it("Should call getFormattedDate with date prop on mounted", async () => {
    expect(wrapper.vm.getFormattedDate).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getFormattedDate).toHaveBeenCalledWith(
      new Date(2000, 1, 1),
      "d"
    );
  });

  it("Should return correct icon on getItemIcon call", async () => {
    expect(wrapper.vm.getItemIcon({ isRecipe: true })).toEqual("utensils");
    expect(wrapper.vm.getItemIcon({ isOrderedFood: true })).toEqual("box-open");
  });

  it("Should add grabbing class to body on drag start and remove it on drag end", async () => {
    await wrapper.vm.onDragStart();
    expect(document.body.classList).toContain("grabbing");
    await wrapper.vm.onDragEnd();
    expect(document.body.classList).not.toContain("grabbing");
  });
});
