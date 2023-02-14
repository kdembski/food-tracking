import { shallowMount } from "@vue/test-utils";
import IngredientsList from "@/views/ingredients/list/index.vue";
import { createStore } from "vuex";

describe("Ingredients List Component", () => {
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
          state,
          actions,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(IngredientsList, {
      global: global.settings,
    });
  });

  it("Should correctly format unit names", async () => {
    expect(
      wrapper.vm.ingredientsListColumns[3].getItemColumnValue([
        "name1",
        "name2",
      ])
    ).toEqual("name1\xa0\xa0|\xa0\xa0name2");
  });

  it("Should trigger delete action on deleteIngredient call", async () => {
    await wrapper.vm.deleteIngredient(1);
    expect(actions.delete).toHaveBeenCalledTimes(1);
    expect(actions.delete).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
