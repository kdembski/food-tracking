import { provide } from "vue";
import { shallowMount } from "@vue/test-utils";
import WeeklyCalendarDay from "./index.vue";

describe("Weekly Calendar Day", () => {
  let wrapper: any;

  beforeEach(async () => {
    global.settings.provide = {
      getFormattedDate: jest.fn(),
    };
    wrapper = shallowMount(WeeklyCalendarDay, {
      props: {
        calendarDay: {},
        date: new Date(2000, 1, 1),
      },
      global: global.settings,
    });

    jest.useFakeTimers().setSystemTime(new Date(2000, 1, 1));
  });

  it("Should call getFormattedDate with date prop on mounted", async () => {
    expect(wrapper.vm.getFormattedDate).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getFormattedDate).toHaveBeenCalledWith(
      new Date(2000, 1, 1),
      "EEEE dd.M"
    );
  });

  it("Should add grabbing class to body on drag start and remove it on drag end", async () => {
    await wrapper.vm.onDragStart();
    expect(document.body.classList).toContain("grabbing");
    await wrapper.vm.onDragEnd();
    expect(document.body.classList).not.toContain("grabbing");
  });

  it("Should return active class if props date matches todays date", async () => {
    expect(wrapper.vm.getActiveClass()).toEqual("calendar-day--active");

    await wrapper.setProps({
      date: new Date(2000, 1, 2),
    });
    expect(wrapper.vm.getActiveClass()).toEqual("");
  });
});
