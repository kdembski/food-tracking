import { shallowMount } from "@vue/test-utils";
import RecipesListView from "@/views/recipes/list/index.vue";
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
      getCount: jest.fn(),
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

  it("Should get recipes count on component mount", async () => {
    expect(actions.getCount).toHaveBeenCalledTimes(1);
  });

  it("Should push router to recipes/new on goToNewRecipeView call", async () => {
    await wrapper.vm.goToNewRecipeView();
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith("/recipes/new");
  });
});
