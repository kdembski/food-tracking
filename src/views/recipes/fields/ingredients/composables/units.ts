import {
  Ingredient,
  IngredientUnitDetails,
} from "@/types/ingredients/ingredient";
import { RecipeIngredient } from "@/types/recipes/recipeIngredient";
import { Ref, WritableComputedRef, nextTick, ref } from "vue";

export function useIngredientUnitFields(
  recipeIngredients: WritableComputedRef<Partial<RecipeIngredient>[]>,
  ingredients: Ref<Record<number, Ingredient | undefined>>,
  getComponentInput: (component: string, index: number) => HTMLInputElement
) {
  const unitAutocompleteKeys = ref<Record<number, number>>({});

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
    incrementUnitAutocompleteKey,
    handleUnitsAfterIngredientChange,
    getIngredientUnitOptions,
    onUnitUpdate,
    unitAutocompleteKeys,
  };
}
