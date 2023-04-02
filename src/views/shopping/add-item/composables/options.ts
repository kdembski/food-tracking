import { computed, onBeforeMount, Ref } from "vue";
import { useStore } from "vuex";
import { IngredientOption } from "@/types/ingredients/ingredient";
import { AddedItemOptionType } from "@/types/shopping/item";

export function useShoppingAddItemOptions() {
  const store = useStore();

  const ingredientOptions: Ref<IngredientOption[] | null> = computed(
    () => store.state.ingredient.options
  );

  const options = computed(() => {
    return ingredientOptions.value?.map((option) => ({
      value: option.id + "-" + AddedItemOptionType.INGREDIENT,
      label: option.name,
    }));
  });

  const loadIngredientOptions = () => {
    return store.dispatch("ingredient/loadOptions");
  };

  onBeforeMount(() => {
    loadIngredientOptions();
  });

  return { options };
}
