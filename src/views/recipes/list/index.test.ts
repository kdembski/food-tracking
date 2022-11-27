import flushPromises from "flush-promises";
import { shallowMount } from "@vue/test-utils";
import RecipesListView from "./index.vue";
import { createStore } from "vuex";

let routerPush: any;
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPush,
  }),
}));

describe("Recipes List View", () => {
  let wrapper: any;
  let store: any;
  let actions: any;

  beforeEach(async () => {
    actions = {
      getRecipesListCount: jest.fn(),
    };

    store = createStore({
      modules: {
        recipe: {
          namespaced: true,
          actions,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    routerPush = jest.fn();

    wrapper = shallowMount(RecipesListView, {
      global: global.settings,
    });
  });

  it("Should get recipes list count on component mount", async () => {
    expect(actions.getRecipesListCount).toHaveBeenCalledTimes(1);
  });

  it("Should open modal and set added recipe on openAddToCalendarModal call", async () => {
    await wrapper.vm.openAddToCalendarModal({ test: "test" });
    expect(wrapper.vm.isAddToCalendarModalOpen).toBe(true);
    expect(wrapper.vm.recipeAddedToCalendar).toEqual({ test: "test" });
  });

  it("Should push router to recipes/new on goToNewRecipeView call", async () => {
    await wrapper.vm.goToNewRecipeView();
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith("/recipes/new");
  });
});
