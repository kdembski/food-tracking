import { shallowMount } from "@vue/test-utils";
import RecipeFields from "@/views/recipes/new/index.vue";
import { createStore } from "vuex";

const pushRouter = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: pushRouter,
  }),
  useRoute: () => ({
    params: {
      id: 1,
    },
  }),
}));

describe("Recipe New", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;

  beforeEach(async () => {
    state = {
      isSubmitting: false,
    };
    actions = {
      create: jest.fn().mockImplementation(() => 1),
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

    wrapper = shallowMount(RecipeFields, {
      global: global.settings,
    });
  });

  it("Should trigger create action and push router on onSubmit call", async () => {
    await wrapper.vm.onSubmit();
    expect(actions.create).toHaveBeenCalledTimes(1);
    expect(pushRouter).toHaveBeenCalledWith("/recipes/1");
  });
});
