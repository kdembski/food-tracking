import { ShoppingCustomItemOption } from "./../../../../types/shopping/custom-item";
import { computed, onBeforeMount, Ref } from "vue";
import { useStore } from "vuex";
import { IngredientOption } from "@/types/ingredients/ingredient";
import { AddedItemOptionType } from "@/types/shopping/item";

export function useShoppingAddItemOptions() {
  const store = useStore();

  const ingredientOptions: Ref<IngredientOption[] | null> = computed(
    () => store.state.ingredient.options
  );

  const customItemOptions: Ref<ShoppingCustomItemOption[] | null> = computed(
    () => store.state.shopping.customItem.options
  );

  const options = computed(() => {
    const preparedIngredientOptions = ingredientOptions.value?.map(
      (option) => ({
        value: option.id + "-" + AddedItemOptionType.INGREDIENT,
        label: option.name,
      })
    );

    const preparedCustomItemOptions = customItemOptions.value?.map(
      (option) => ({
        value: option.id + "-" + AddedItemOptionType.CUSTOM,
        label: option.name,
      })
    );

    if (!preparedCustomItemOptions || !preparedIngredientOptions) {
      return [];
    }
    return preparedIngredientOptions?.concat(preparedCustomItemOptions);
  });

  const loadIngredientOptions = () => {
    return store.dispatch("ingredient/loadOptions");
  };

  const loadShoppingCustomItemOptions = () => {
    return store.dispatch("shopping/customItem/loadOptions");
  };

  onBeforeMount(() => {
    loadIngredientOptions();
    loadShoppingCustomItemOptions();
  });

  return { options };
}
