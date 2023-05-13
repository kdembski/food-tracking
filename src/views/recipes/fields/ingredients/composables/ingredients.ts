import { RecipeIngredient } from "@/types/recipes/recipeIngredient";
import {
  Ingredient,
  IngredientUnitDetails,
} from "@/types/ingredients/ingredient";
import { nextTick, ref, WritableComputedRef } from "vue";
import { useStore } from "vuex";

export function useIngredients(
  recipeIngredients: WritableComputedRef<Partial<RecipeIngredient>[]>,
  getComponentInput: (component: string, index: number) => HTMLInputElement
) {
  const store = useStore();
  const ingredientsOptions = ref([]);
  const ingredients = ref<Record<number, Ingredient | undefined>>({});
  const isLoadingIngredients = ref(false);
  const isLoadingUnits = ref<Record<number, boolean>>({});
  const unitAutocompleteKeys = ref<Record<number, number>>({});

  const setIngredientsOptions = async () => {
    await store.dispatch("ingredient/loadOptions");
    ingredientsOptions.value = store.getters["ingredient/options"];
  };

  const setIngredient = async (id: number, index: number) => {
    if (!id) {
      ingredients.value[index] = undefined;
      recipeIngredients.value[index].unitId = undefined;
      incrementUnitAutocompleteKey(index);
      return;
    }

    isLoadingUnits.value[index] = true;
    await store.dispatch("ingredient/load", id);

    const ingredient = store.state.ingredient.single;
    ingredients.value[index] = ingredient;

    handleUnitsAfterIngredientChange(ingredient.units, index);
    isLoadingUnits.value[index] = false;
  };

  const handleUnitsAfterIngredientChange = async (
    units: IngredientUnitDetails[],
    index: number
  ) => {
    if (units.length === 1) {
      recipeIngredients.value[index].unitId = units[0].unitId;
      incrementUnitAutocompleteKey(index);
      getComponentInput("amount-input", index)?.focus();
      return;
    }

    recipeIngredients.value[index].unitId = undefined;
    incrementUnitAutocompleteKey(index);
    await nextTick();
    getComponentInput("units-autocomplete", index)?.focus();
  };

  const incrementUnitAutocompleteKey = (index: number) => {
    unitAutocompleteKeys.value[index]
      ? unitAutocompleteKeys.value[index]++
      : (unitAutocompleteKeys.value[index] = 1);
  };

  const onIngredientRemove = async () => {
    await nextTick();
    fillIngredients();
  };

  const fillIngredients = async () => {
    isLoadingIngredients.value = true;

    const promises = recipeIngredients.value.map((item) => {
      if (!item.ingredientId) {
        return;
      }
      return store.dispatch("ingredient/load", item.ingredientId);
    });

    const items = await Promise.all(promises);
    ingredients.value = {};
    items.forEach((item, index) => {
      ingredients.value[index] = item;
    });

    isLoadingIngredients.value = false;
  };

  const getIngredientUnitOptions = (index: number) => {
    const ingredient = ingredients.value[index];
    if (!ingredient) {
      return [];
    }

    const units = ingredient.units;
    return units.map((unit) => {
      return {
        value: unit.unitId,
        label: unit.unitName,
      };
    });
  };

  const onUnitUpdate = (index: number, value?: unknown) => {
    if (!value) {
      return;
    }
    getComponentInput("amount-input", index)?.focus();
  };

  return {
    ingredients,
    ingredientsOptions,
    isLoadingIngredients,
    isLoadingUnits,
    unitAutocompleteKeys,
    setIngredient,
    setIngredientsOptions,
    onIngredientRemove,
    fillIngredients,
    getIngredientUnitOptions,
    onUnitUpdate,
  };
}
