import flushPromises from "flush-promises";
import { mount } from "@vue/test-utils";
import RecipeFields from "@/views/recipes/fields/recipe/index.vue";
import { createStore } from "vuex";

describe("Recipe Fields", () => {
  let wrapper: any;
  let store: any;
  let getters: any;
  let actions: any;

  beforeEach(async () => {
    getters = {
      isLoadingTags: jest.fn(),
      tags: jest.fn(),
    };
    actions = {
      loadTags: jest.fn(),
    };

    store = createStore({
      modules: {
        recipe: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(RecipeFields, {
      props: {
        recipe: {},
      },
      global: global.settings,
    });
    await flushPromises();
  });

  it("Should trigger load tags action on component mount", async () => {
    expect(actions.loadTags).toHaveBeenCalledTimes(1);
    expect(getters.tags).toHaveBeenCalledTimes(1);
  });
});
