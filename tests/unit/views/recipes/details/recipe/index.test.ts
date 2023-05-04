import { shallowMount } from "@vue/test-utils";
import RecipeDetails from "@/views/recipes/details/recipe/index.vue";
import { createStore } from "vuex";

jest.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      id: 1,
    },
  }),
  useRouter: jest.fn(),
}));

describe("Recipe Details", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;
  let mutations: any;

  beforeEach(async () => {
    state = {
      isLoading: false,
      single: { id: 1 },
    };
    mutations = {
      setSingle: jest.fn(),
    };
    actions = {
      load: jest.fn(),
    };

    store = createStore({
      modules: {
        recipe: {
          namespaced: true,
          state,
          actions,
          mutations,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(RecipeDetails, {
      global: global.settings,
    });
  });

  it("Should trigger load recipe on component mount", async () => {
    expect(actions.load).toHaveBeenCalledTimes(1);
  });

  it("Should set isEditing to true and make recipe clone on startEditing call", async () => {
    wrapper.vm.startEditing();
    expect(wrapper.vm.isEditing).toBe(true);
    expect(wrapper.vm.tempRecipe).toEqual({ id: 1 });
  });

  it("Should set isEditing to false and restore recipe from tempRecipe on cancelEditing call", async () => {
    wrapper.vm.tempRecipe = { id: 2 };
    wrapper.vm.isEditing = true;

    wrapper.vm.cancelEditing();
    expect(wrapper.vm.isEditing).toBe(false);
    expect(mutations.setSingle).toHaveBeenCalledWith(expect.any(Object), {
      id: 2,
    });
  });
});
