import { shallowMount } from "@vue/test-utils";
import EditRecipe from "@/views/recipes/details/recipe/edit-recipe/index.vue";
import { createStore } from "vuex";

describe("Recipe Edit", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;

  beforeEach(async () => {
    actions = {
      update: jest.fn(),
    };
    state = {
      isSubmitting: false,
    };

    store = createStore({
      modules: {
        recipe: {
          namespaced: true,
          state,
          actions,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(EditRecipe, {
      props: {
        recipe: {},
      },
      global: global.settings,
    });
  });

  it("Should trigger update action on updateRecipe call", async () => {
    await wrapper.vm.updateRecipe();
    expect(actions.update).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
  });
});
