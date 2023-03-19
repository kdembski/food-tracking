import flushPromises from "flush-promises";
import { mount } from "@vue/test-utils";
import RecipeIngredientsFields from "@/views/recipes/fields/ingredients/index.vue";
import { createStore } from "vuex";

describe("Recipe Ingredients Fields", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let getters: any;
  let actions: any;
  let single: any;
  let units: any;

  beforeEach(async () => {
    single = { id: 2, units: [{ unitId: 2 }] };
    units = [{ unitId: 1, unitName: "name" }];

    state = {
      single,
    };
    getters = {
      options: jest.fn(),
    };
    actions = {
      loadOptions: jest.fn(),
      load: jest.fn().mockImplementation(() => ({
        id: 1,
        units,
      })),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          state,
          actions,
          getters,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(RecipeIngredientsFields, {
      props: {
        modelValue: [{ ingredientId: 1 }, { ingredientId: 2 }],
      },
      global: global.settings,
    });
    await flushPromises();
  });

  it("Should trigger load ingredient options on component mount", async () => {
    expect(actions.loadOptions).toBeCalledTimes(1);
    expect(getters.options).toHaveBeenCalledTimes(1);
  });

  it("Should load ingredients on component mount", async () => {
    expect(actions.load).toBeCalledTimes(2);
    expect(actions.load).toBeCalledWith(expect.any(Object), 1);
    expect(actions.load).toBeCalledWith(expect.any(Object), 2);
    expect(wrapper.vm.ingredients).toEqual({
      0: {
        id: 1,
        units,
      },
      1: {
        id: 1,
        units,
      },
    });
  });

  it("Should add empty object if modelValue length is equal to 0", async () => {
    wrapper = mount(RecipeIngredientsFields, {
      props: {
        modelValue: [],
      },
      global: global.settings,
    });
    await flushPromises();
    expect(wrapper.emitted()["update:modelValue"][0][0]).toEqual([{}]);
  });

  it("Should load and set ingredient on setIngredient call", async () => {
    await wrapper.vm.setIngredient(1, 1);
    expect(actions.load).toHaveBeenCalledWith(expect.any(Object), 1);
    expect(wrapper.vm.ingredients[1]).toEqual(single);
    expect(wrapper.vm.recipeIngredients[1].unitId).toEqual(2);
  });

  it("Should reset ingredient on setIngredient call with no id", async () => {
    await wrapper.vm.setIngredient(null, 1);
    expect(wrapper.vm.ingredients[1]).toEqual(undefined);
    expect(wrapper.vm.recipeIngredients[1].unitId).toEqual(undefined);
    expect(wrapper.vm.unitAutocompleteKeys[1]).toEqual(1);
  });

  it("Should reset recipeIngredient unitId on setIngredient call when more that one unit", async () => {
    single.units.push({ id: 3 });
    await wrapper.vm.setIngredient(1, 1);
    expect(wrapper.vm.recipeIngredients[1].unitId).toEqual(undefined);
  });

  it("Should return unit options on getIngredientUnitOptions call", async () => {
    expect(wrapper.vm.getIngredientUnitOptions(0)).toEqual([
      {
        label: "name",
        value: 1,
      },
    ]);
  });

  it("Should load ingredients on onIngredientRemove call", async () => {
    await wrapper.vm.onIngredientRemove();
    expect(actions.load).toBeCalledTimes(4);
  });

  it("Should focus unit input on onUnitUpdate call", async () => {
    await wrapper.vm.onUnitUpdate(1, null);
    await wrapper.vm.onUnitUpdate(1, 1);
  });
});
