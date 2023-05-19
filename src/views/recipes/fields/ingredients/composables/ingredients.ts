import { RecipeIngredient } from "@/types/recipes/recipeIngredient";
import { Ingredient } from "@/types/ingredients/ingredient";
import { nextTick, ref, WritableComputedRef } from "vue";
import { useStore } from "vuex";
import { useIngredientUnitFields } from "./units";

export function useIngredientFields(
  recipeIngredients: WritableComputedRef<Partial<RecipeIngredient>[]>,
  getComponentInput: (component: string, index: number) => HTMLInputElement
) {
  const store = useStore();
  const ingredientsOptions = ref([]);
  const ingredients = ref<Record<number, Ingredient | undefined>>({});
  const isLoadingIngredients = ref(false);
  const isLoadingUnits = ref<Record<number, boolean>>({});

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

  const {
    incrementUnitAutocompleteKey,
    handleUnitsAfterIngredientChange,
    getIngredientUnitOptions,
    onUnitUpdate,
    unitAutocompleteKeys,
  } = useIngredientUnitFields(
    recipeIngredients,
    ingredients,
    getComponentInput
  );

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
