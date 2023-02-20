import { shallowMount } from "@vue/test-utils";
import CategoriesList from "@/views/ingredients/categories/index.vue";
import { createStore } from "vuex";

describe("Categories List Component", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;

  beforeEach(async () => {
    state = {
      isSubmitting: false,
    };

    actions = {
      delete: jest.fn(),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          modules: {
            category: {
              namespaced: true,
              state,
              actions,
            },
          },
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(CategoriesList, {
      global: global.settings,
    });
  });

  it("Should trigger delete action on deleteCategory call", async () => {
    await wrapper.vm.deleteCategory(1);
    expect(actions.delete).toHaveBeenCalledTimes(1);
    expect(actions.delete).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
