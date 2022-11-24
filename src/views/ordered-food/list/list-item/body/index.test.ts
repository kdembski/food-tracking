import { shallowMount } from "@vue/test-utils";
import OrderedFoodListItemBody from "./index.vue";

describe("Ordered Food List View", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(OrderedFoodListItemBody, {
      props: {
        item: {},
      },
      global: global.settings,
    });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
