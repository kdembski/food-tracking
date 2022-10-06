import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import AddToCalendarModal from "./index.vue";
import CDatePicker from "@/components/controls/date-picker/index.vue";

describe("Add To Calendar Modal Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(AddToCalendarModal, {
      props: { isOpen: true, addedItem: { id: 1 } },
      global: global.settings,
    });
  });

  it("isSelectedDatesEmpty should return true if selected dates length is 0", async () => {
    expect(wrapper.vm.isSelectedDatesEmpty()).toBe(true);
    wrapper.vm.selectedDates = [new Date()];
    expect(wrapper.vm.isSelectedDatesEmpty()).toBe(false);
  });

  it("Should set portions based on selectedDates when selectedDates change", async () => {
    const datePicker = wrapper.getComponent(CDatePicker);
    const firstDateBtn = datePicker.find("input#date-0");
    expect(wrapper.vm.portions).toEqual([]);

    await firstDateBtn.setChecked();
    expect(wrapper.vm.portions).toEqual([2]);
  });
});
