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
  const ingredients = ref<Record<number, Ingredient>>({});
  const isLoadingIngredients = ref(false);
  const isLoadingUnits = ref<Record<number, boolean>>({});
  const unitAutocompleteKey = ref(0);

  const setIngredientsOptions = async () => {
    await store.dispatch("ingredient/loadOptions");
    ingredientsOptions.value = store.getters["ingredient/options"];
  };

  const setIngredient = async (id: number, index: number) => {
    if (!id) {
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
      getComponentInput("amount-input", index)?.focus();
      return;
    }

    recipeIngredients.value[index].unitId = undefined;
    unitAutocompleteKey.value++;
    await nextTick();
    getComponentInput("units-autocomplete", index)?.focus();
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

    ingredients.value = {};
    await Promise.all(promises).then((items) => {
      items.forEach((item, index) => {
        ingredients.value[index] = item;
      });
    });

    isLoadingIngredients.value = false;
  };

  const getIngredientUnitOptions = (index: number) => {
    if (!ingredients.value[index]) {
      return [];
    }

    const units = ingredients.value[index].units;
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
    unitAutocompleteKey,
    setIngredient,
    setIngredientsOptions,
    onIngredientRemove,
    fillIngredients,
    getIngredientUnitOptions,
    onUnitUpdate,
  };
}
