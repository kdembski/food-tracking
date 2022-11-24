import flushPromises from "flush-promises";
import { shallowMount } from "@vue/test-utils";
import OrderedFoodListView from "./index.vue";

describe("Ordered Food List View", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(OrderedFoodListView, {
      global: global.settings,
    });
  });

  it("Should open add to calendar modal on openAddToCalendarModal call", async () => {
    wrapper.vm.openAddToCalendarModal({ test: "test" });
    expect(wrapper.vm.orderedFoodAddedToCalendar).toEqual({ test: "test" });
    expect(wrapper.vm.isAddToCalendarModalOpen).toBe(true);
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
