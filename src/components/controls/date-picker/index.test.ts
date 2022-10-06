import { mount, DOMWrapper } from "@vue/test-utils";
import CDatePicker from "./index.vue";

describe("Date Picker Component", () => {
  let wrapper: any = null;
  let monthlyModeBtn: DOMWrapper<HTMLButtonElement>;
  let weeklyModeBtn: DOMWrapper<HTMLButtonElement>;
  let incrementDateBtn: DOMWrapper<HTMLButtonElement>;
  let decrementDateBtn: DOMWrapper<HTMLButtonElement>;

  beforeEach(async () => {
    wrapper = mount(CDatePicker, {
      props: {
        modelValue: [],
      },
      global: global.settings,
    });

    wrapper.vm.firstDateInMonth = new Date(2000, 1, 1);
    wrapper.vm.firstDateInWeek = new Date(2000, 1, 7);

    const buttons = wrapper.find(".date-picker__toolbar").findAll("button");
    monthlyModeBtn = buttons[2];
    weeklyModeBtn = buttons[3];
    incrementDateBtn = buttons[1];
    decrementDateBtn = buttons[0];
  });

  it("getDatePickerRange should return date range based on delected mode", async () => {
    expect(wrapper.vm.getDatePickerRange()).toEqual("7 lut - 13 lut");

    await monthlyModeBtn.trigger("click");
    expect(wrapper.vm.getDatePickerRange()).toEqual("luty 2000");
  });

  it("should add date to selected on item click while in weekly mode", async () => {
    const firstItem = wrapper.findAll("input")[0];
    await firstItem.setChecked();
    expect(wrapper.emitted()["update:modelValue"][0][0]).toStrictEqual([
      new Date(2000, 1, 7),
    ]);
  });

  it("should add date to selected on item click while in monthly mode", async () => {
    await monthlyModeBtn.trigger("click");
    const firstItem = wrapper.findAll("input")[0];
    await firstItem.setChecked();
    expect(wrapper.emitted()["update:modelValue"][1][0]).toStrictEqual([
      new Date(2000, 1, 1),
    ]);
  });

  it("should add month to firstDateInMonth on incrementDateBtn click while in monthly mode", async () => {
    await monthlyModeBtn.trigger("click");
    incrementDateBtn.trigger("click");
    expect(wrapper.vm.firstDateInMonth).toStrictEqual(new Date(2000, 2, 1));
  });

  it("should substract month from firstDateInMonth on decrementDateBtn click while in monthly mode", async () => {
    await monthlyModeBtn.trigger("click");
    decrementDateBtn.trigger("click");
    expect(wrapper.vm.firstDateInMonth).toStrictEqual(new Date(2000, 0, 1));
  });

  it("should add week to firstDateInWeek on incrementDateBtn click while in weekly mode", async () => {
    incrementDateBtn.trigger("click");
    expect(wrapper.vm.firstDateInWeek).toStrictEqual(new Date(2000, 1, 14));
  });

  it("should substract week from firstDateInWeek on decrementDateBtn click while in weekly mode", async () => {
    decrementDateBtn.trigger("click");
    expect(wrapper.vm.firstDateInWeek).toStrictEqual(new Date(2000, 0, 31));
  });

  it("should change calendar mode using buttons", async () => {
    expect(wrapper.vm.calendarMode).toEqual("WEEKLY");
    monthlyModeBtn.trigger("click");
    expect(wrapper.vm.calendarMode).toEqual("MONTHLY");
    weeklyModeBtn.trigger("click");
    expect(wrapper.vm.calendarMode).toEqual("WEEKLY");
  });
});
