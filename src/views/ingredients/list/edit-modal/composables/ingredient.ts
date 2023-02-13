import { DeepPartial } from "@/types/common";
import { Ingredient } from "@/types/ingredients/ingredient";
import { computed, ref, Ref } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";

export function useIngredient(props: any) {
  const store = useStore();

  const selectedPrimaryIndex: Ref<number> = ref(0);
  const emptyIngredient: DeepPartial<Ingredient> = {
    name: "",
    units: [{}],
  };

  const ingredient = ref(cloneDeep(emptyIngredient));
  const isAddingNewIngredient = computed(() => !props.ingredientId);
  const isLoadingIngredient = computed(() => store.state.ingredient.isLoading);
  const isSubmitting = computed(() => store.state.ingredient.isSubmitting);

  const setIngredient = async () => {
    await store.dispatch("ingredient/load", props.ingredientId);
    ingredient.value = store.state.ingredient.single;

    if (getUnitsLength() === 0) {
      ingredient.value.units = [{}];
    }
    selectedPrimaryIndex.value = getIndexOfPrimaryUnit();
  };

  const getUnitsLength = () => {
    return ingredient.value.units?.length || 0;
  };

  const getIndexOfPrimaryUnit = () => {
    const units = ingredient.value.units;
    return units?.indexOf(units.find((unit) => unit?.isPrimary)) || 0;
  };

  const updatePrimaryUnit = () => {
    ingredient.value.units?.forEach((unit, index) => {
      if (!unit) {
        return;
      }
      unit.isPrimary = selectedPrimaryIndex.value === index;
    });
  };

  const onUnitRemove = () => {
    if (getUnitsLength() > selectedPrimaryIndex.value) {
      return;
    }

    selectedPrimaryIndex.value = 0;
    updatePrimaryUnit();
  };

  const updateIngredient = () => {
    updatePrimaryUnit();
    return store.dispatch("ingredient/update", ingredient.value);
  };

  const createIngredient = () => {
    updatePrimaryUnit();
    return store.dispatch("ingredient/create", ingredient.value);
  };

  return {
    selectedPrimaryIndex,
    emptyIngredient,
    ingredient,
    isAddingNewIngredient,
    isLoadingIngredient,
    isSubmitting,
    setIngredient,
    updateIngredient,
    createIngredient,
    onUnitRemove,
    updatePrimaryUnit,
  };
}
