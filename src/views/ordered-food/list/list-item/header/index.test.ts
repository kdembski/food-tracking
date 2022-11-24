import { shallowMount } from "@vue/test-utils";
import OrderedFoodListItemHeader from "./index.vue";

describe("Ordered Food List Item Header", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(OrderedFoodListItemHeader, {
      props: {
        item: {
          id: 1,
        },
      },
      global: global.settings,
    });
  });

  it("Should emit addToCalendar event on addToCalendar method call", async () => {
    wrapper.vm.addToCalendar();
    expect(wrapper.emitted().addToCalendar[0][0]).toEqual({ id: 1 });
  });

  it("Should emit edit event on edit method call", async () => {
    wrapper.vm.edit();
    expect(wrapper.emitted().edit[0][0]).toEqual(1);
  });
});
