import { IngredientUnitDetails } from "@/types/ingredients/ingredient";
import { AddedItemOptionType, ShoppingItem } from "@/types/shopping/item";
import { ComputedRef, ref, Ref } from "vue";
import { useStore } from "vuex";

export function useShoppingAddItem(
  amount: Ref<number | undefined>,
  primaryUnit: ComputedRef<IngredientUnitDetails | undefined>,
  listId: number
) {
  const store = useStore();
  const selectedItem = ref<string>();

  const convertSelectedItemToObject = (item?: string) => {
    const splittedItem = item?.split("-");
    if (!splittedItem) {
      return;
    }

    return {
      id: parseInt(splittedItem[0]),
      type: splittedItem[1] as AddedItemOptionType,
    };
  };

  const isCustomItem = () => {
    return (
      convertSelectedItemToObject(selectedItem.value)?.type ===
      AddedItemOptionType.CUSTOM
    );
  };

  const addItem = (item: Partial<ShoppingItem>) => {
    return store.dispatch("shopping/item/create", item);
  };

  const buildItem = (): Partial<ShoppingItem> | undefined => {
    if (!selectedItem.value) {
      return;
    }
    const selectedItemObject = convertSelectedItemToObject(selectedItem.value);

    if (isCustomItem()) {
      return {
        shoppingListId: listId,
        customItemId: selectedItemObject?.id,
        amount: amount.value,
      };
    }

    return {
      shoppingListId: listId,
      ingredientUnitId: primaryUnit.value?.id,
      amount: amount.value,
    };
  };

  const onItemSelect = (value?: string) => {
    amount.value = undefined;
    store.commit("ingredient/setSingle", null);

    if (!value) {
      return;
    }

    const convetedItem = convertSelectedItemToObject(value);
    if (convetedItem?.type !== AddedItemOptionType.INGREDIENT) {
      return;
    }

    loadIngredient(convetedItem.id);
  };

  const loadIngredient = (id: number) => {
    return store.dispatch("ingredient/load", id);
  };

  return { selectedItem, buildItem, addItem, onItemSelect };
}
