import { shallowMount } from "@vue/test-utils";
import RecipeIngredients from "@/views/recipes/details/ingredients/index.vue";
import { createStore } from "vuex";

jest.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      id: 1,
    },
  }),
}));

describe("Recipe Ingredients", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;
  let mutations: any;

  beforeEach(async () => {
    state = {
      isLoadingCollection: false,
      isSubmittingCollection: false,
      collection: [{ id: 1 }],
    };
    mutations = {
      setCollection: jest.fn(),
    };
    actions = {
      loadCollection: jest.fn(),
      updateCollection: jest.fn(),
    };

    store = createStore({
      modules: {
        recipe: {
          namespaced: true,
          modules: {
            ingredient: {
              namespaced: true,
              state,
              actions,
              mutations,
            },
          },
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(RecipeIngredients, {
      global: global.settings,
    });
  });

  it("Should trigger loadCollection recipe on component mount", async () => {
    expect(actions.loadCollection).toHaveBeenCalledTimes(1);
  });

  it("Should trigger updateCollection action on updateIngredients call", async () => {
    await wrapper.vm.updateIngredients();
    expect(actions.updateCollection).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(actions.loadCollection).toHaveBeenCalledTimes(2);
  });

  it("Should set isEditing to true and make recipe clone on startEditing call", async () => {
    wrapper.vm.startEditing();
    expect(wrapper.vm.isEditing).toBe(true);
    expect(wrapper.vm.tempIngredients).toEqual([{ id: 1 }]);
  });

  it("Should set isEditing to false and restore recipe from tempIngredients on cancelEditing call", async () => {
    wrapper.vm.tempIngredients = [{ id: 2 }];
    wrapper.vm.isEditing = true;

    wrapper.vm.cancelEditing();
    expect(wrapper.vm.isEditing).toBe(false);
    expect(mutations.setCollection).toHaveBeenCalledWith(expect.any(Object), [
      {
        id: 2,
      },
    ]);
  });
});
