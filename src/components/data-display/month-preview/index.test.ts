import { mount } from "@vue/test-utils";
import CMonthPreview from "./index.vue";

describe("Month Preview Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CMonthPreview, {
      props: {
        dates: [
          new Date(2000, 1, 1),
          new Date(2000, 1, 2),
          new Date(2000, 1, 3),
        ],
      },
      global: global.settings,
    });

    jest.useFakeTimers().setSystemTime(new Date(2000, 1, 2));
  });

  it("getActiveItemClass should return active class if provided date matches some date from props", async () => {
    expect(wrapper.vm.getActiveItemClass(new Date(2000, 1, 1))).toEqual(
      "month-preview__item--cooked"
    );

    expect(wrapper.vm.getActiveItemClass(new Date(2000, 1, 2))).toEqual(
      "month-preview__item--cooked"
    );

    expect(wrapper.vm.getActiveItemClass(new Date(2000, 1, 3))).toEqual(
      "month-preview__item--planned"
    );

    expect(wrapper.vm.getActiveItemClass(new Date(2000, 2, 1))).toEqual("");
  });

  it("getCurrentWeekClass should return current week class f provided date exists in current week", async () => {
    expect(wrapper.vm.getCurrentWeekClass(new Date(2000, 1, 4))).toEqual(
      "month-preview__item--current-week"
    );

    expect(wrapper.vm.getCurrentWeekClass(new Date(2000, 1, 10))).toEqual("");
  });
});
