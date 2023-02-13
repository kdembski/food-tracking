import flushPromises from "flush-promises";
import { provide } from "vue";
import { mount as composableMount } from "vue-composable-tester";
import { createStore } from "vuex";
import { useIngredient } from "@/views/ingredients/list/edit-modal/composables/ingredient";

describe("Edit Ingredient Modal Ingredient Composable", () => {
  let composable: any;
  let store: any;
  let state: any;
  let actions: any;

  beforeEach(async () => {
    state = {
      isSubmitting: true,
      isLoading: false,
      single: {
        units: [],
      },
    };
    actions = {
      load: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
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

    composable = composableMount(() => useIngredient({ ingredientId: 1 }), {
      provider: () => {
        provide("store", store);
      },
    }).result;
  });

  it("Should call load action with ingredient id on setIngredient call", async () => {
    await composable.setIngredient();
    expect(actions.load).toHaveBeenCalledTimes(1);
    expect(actions.load).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it("Should add unit on setIngredient call if units are empty", async () => {
    await composable.setIngredient();
    expect(state.single.units).toEqual([{}]);
  });

  it("Should set selectedPrimatyIndex on setIngredient call", async () => {
    state.single.units = [{}, { isPrimary: true }];
    await composable.setIngredient();
    expect(composable.selectedPrimaryIndex.value).toEqual(1);
  });

  it("Should set units isPrimary based on selectedPrimaryIndex", async () => {
    composable.ingredient.value.units = [undefined, {}, {}];
    composable.selectedPrimaryIndex.value = 2;
    await composable.updatePrimaryUnit();
    expect(composable.ingredient.value.units[2].isPrimary).toBe(true);
  });

  it("Should set selectedPrimaryIndex to 0 on unit remove if previous primary unit not exists", async () => {
    composable.ingredient.value.units = [{}];
    composable.selectedPrimaryIndex.value = 2;
    await composable.onUnitRemove();
    expect(composable.selectedPrimaryIndex.value).toEqual(0);

    await composable.onUnitRemove();
  });

  it("Should call update action on updateIngredient call", async () => {
    await composable.updateIngredient();
    expect(actions.update).toHaveBeenCalledTimes(1);
  });

  it("Should call create action on createIngredient call", async () => {
    await composable.createIngredient();
    expect(actions.create).toHaveBeenCalledTimes(1);
  });
});
