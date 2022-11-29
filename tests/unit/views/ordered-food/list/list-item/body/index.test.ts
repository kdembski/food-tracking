import { shallowMount } from "@vue/test-utils";
import OrderedFoodListItemBody from "@/views/ordered-food/list/list-item/body/index.vue";

describe("Ordered Food List Item Body", () => {
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
