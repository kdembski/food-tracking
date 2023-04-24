import { shallowMount } from "@vue/test-utils";
import RecipesListItemHeader from "@/views/recipes/list/list-item/header/index.vue";
import { createStore } from "vuex";

describe("Recipes List Item Header", () => {
  let wrapper: any;
  let store: any;
  let calendarMutations: any;

  beforeEach(async () => {
    calendarMutations = {
      setIsAddToCalendarModalOpen: jest.fn(),
      setAddedRecipe: jest.fn(),
    };

    store = createStore({
      modules: {
        recipe: {
          namespaced: true,
        },
        calendar: {
          mutations: calendarMutations,
          namespaced: true,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(RecipesListItemHeader, {
      props: {
        item: {
          cookidooLink: "test",
        },
      },
      global: global.settings,
    });
  });

  it("Should open modal and set added recipe on openAddToCalendarModal call", async () => {
    await wrapper.vm.openAddToCalendarModal({ test: "test" });
    expect(calendarMutations.setAddedRecipe).toHaveBeenCalledWith(
      expect.any(Object),
      { test: "test" }
    );
    expect(calendarMutations.setIsAddToCalendarModalOpen).toHaveBeenCalledWith(
      expect.any(Object),
      true
    );
  });

  it("Should get recipes list count on component mount", async () => {
    window.open = jest.fn();
    await wrapper.vm.openCookidoLink();
    expect(window.open).toHaveBeenCalledWith("test", "_blank");
  });

  it("Should push cookido link to mobile options if cookidoo link exists", async () => {
    expect(wrapper.vm.mobileDropdownOptions.length).toEqual(3);
    await wrapper.setProps({
      item: {},
    });
    expect(wrapper.vm.mobileDropdownOptions.length).toEqual(2);
  });
});
