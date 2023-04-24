import { shallowMount } from "@vue/test-utils";
import OrderedFoodListView from "@/views/ordered-food/list/index.vue";

describe("Ordered Food List View", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(OrderedFoodListView, {
      global: global.settings,
    });
  });

  it("Should open edit modal on add button click", async () => {
    wrapper.vm.onAddButtonClick();
    expect(wrapper.vm.editedOrderedFoodId).toEqual(undefined);
    expect(wrapper.vm.isEditModalOpen).toBe(true);
  });

  it("Should open edit modal and set edited id on edit button click", async () => {
    wrapper.vm.editOrderedFood(1);
    expect(wrapper.vm.editedOrderedFoodId).toEqual(1);
    expect(wrapper.vm.isEditModalOpen).toBe(true);
  });
});
