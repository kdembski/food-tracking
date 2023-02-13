import { shallowMount } from "@vue/test-utils";
import IngredientsView from "@/views/ingredients/index.vue";
import { IngredientsNavItems } from "@/types/ingredients/ingredient";

describe("Ingredients View", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(IngredientsView, {
      global: global.settings,
    });
  });

  it("Should show active element based on selectedTab", async () => {
    expect(wrapper.vm.isListActive()).toBe(true);

    wrapper.vm.selectedTab = IngredientsNavItems.UNITS;
    expect(wrapper.vm.isUnitsActive()).toBe(true);

    wrapper.vm.selectedTab = IngredientsNavItems.CATEGORIES;
    expect(wrapper.vm.isCategoriesActive()).toBe(true);
  });
});
