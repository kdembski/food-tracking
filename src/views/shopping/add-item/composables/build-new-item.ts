import { Ingredient } from "@/types/ingredients/ingredient";
import { DropdownOption } from "@/types/components/utils/dropdown";
import { IngredientUnitDetails } from "@/types/ingredients/ingredient";
import { SelectedShoppingItem, ShoppingItem } from "@/types/shopping/item";
import { computed, ComputedRef, Ref } from "vue";
import { useStore } from "vuex";

export function useBuildNewShoppingItem(
  isCustomItem: () => boolean,
  selectedItemObject: ComputedRef<SelectedShoppingItem | undefined>,
  primaryUnit: ComputedRef<IngredientUnitDetails | undefined>,
  options: ComputedRef<DropdownOption[] | undefined>,
  listId: number,
  amount: Ref<number | undefined>
) {
  const store = useStore();

  const buildNewItem = () => {
    if (isCustomItem()) {
      return buildCustomItem();
    }
    return buildIngredientItem();
  };

  const itemName = computed(() => {
    const value =
      selectedItemObject.value?.id + "-" + selectedItemObject.value?.type;
    return options.value?.find((option) => option.value === value)?.label;
  });

  const buildCustomItem = (): Partial<ShoppingItem> | undefined => {
    return {
      shoppingListId: listId,
      customItemId: selectedItemObject.value?.id,
      customItemName: itemName.value,
      amount: amount.value,
      isChecked: false,
      recipeId: null,
      ingredientCategoryId: null,
    };
  };

  const buildIngredientItem = (): Partial<ShoppingItem> | undefined => {
    const ingredient: Ingredient = store.state.ingredient.single;
    return {
      shoppingListId: listId,
      ingredientId: ingredient?.id,
      ingredientCategoryId: ingredient?.categoryId,
      ingredientUnitId: primaryUnit.value?.id,
      ingredientName: itemName.value,
      unitShortcut: primaryUnit.value?.unitShortcut,
      amount: amount.value,
      isChecked: false,
      isPrimary: primaryUnit.value?.isPrimary,
      recipeId: null,
    };
  };

  return {
    buildNewItem,
  };
}
