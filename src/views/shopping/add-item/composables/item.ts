import { ShoppingCustomItem } from "@/types/shopping/custom-item";
import { IngredientUnitDetails } from "@/types/ingredients/ingredient";
import { AddedItemOptionType, ShoppingItem } from "@/types/shopping/item";
import { computed, ComputedRef, ref, Ref } from "vue";
import { useStore } from "vuex";
import { DropdownOption } from "@/types/components/utils/dropdown";
import { useBuildNewShoppingItem } from "./build-new-item";
import { useCustomShoppingItem } from "./custom-item";

export function useAddShoppingItem(
  amount: Ref<number | undefined>,
  primaryUnit: ComputedRef<IngredientUnitDetails | undefined>,
  options: ComputedRef<DropdownOption[] | undefined>,
  listId: number,
  amountInput: Ref<{ input: HTMLInputElement } | undefined>
) {
  const store = useStore();
  const selectedItem = ref<string>();
  const selectedItemObject = computed(() => {
    const splittedItem = selectedItem.value?.split("-");
    if (!splittedItem) {
      return;
    }

    return {
      id: parseInt(splittedItem[0]),
      type: splittedItem[1] as AddedItemOptionType,
    };
  });

  const isCustomItem = () => {
    return selectedItemObject.value?.type === AddedItemOptionType.CUSTOM;
  };

  const addItem = async () => {
    if (!selectedItem.value) {
      return;
    }

    const item = buildNewItem();
    await store.dispatch("shopping/item/create", {
      shoppingListId: item?.shoppingListId,
      ingredientUnitId: item?.ingredientUnitId,
      customItemId: item?.customItemId,
      amount: item?.amount,
    });
    return item;
  };

  const onItemSelect = async (value?: string) => {
    amount.value = undefined;
    store.commit("ingredient/setSingle", null);

    if (!value) {
      return;
    }

    if (selectedItemObject.value?.type !== AddedItemOptionType.INGREDIENT) {
      return;
    }

    await loadIngredient(selectedItemObject.value.id);
    amountInput.value?.input.focus();
  };

  const loadIngredient = (id: number) => {
    return store.dispatch("ingredient/load", id);
  };

  const { buildNewItem } = useBuildNewShoppingItem(
    isCustomItem,
    selectedItemObject,
    primaryUnit,
    options,
    listId,
    amount
  );

  const { onAddCustomItem } = useCustomShoppingItem(selectedItem, options);

  return { selectedItem, addItem, onAddCustomItem, onItemSelect };
}
