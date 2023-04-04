import { DropdownOption } from "@/types/components/utils/dropdown";
import { ShoppingCustomItem } from "@/types/shopping/custom-item";
import { AddedItemOptionType } from "@/types/shopping/item";
import { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";

export function useCustomShoppingItem(
  selectedItem: Ref<string | undefined>,
  options: ComputedRef<DropdownOption[] | undefined>
) {
  const store = useStore();

  const addCustomItem = (
    item: Partial<ShoppingCustomItem>
  ): Promise<number> => {
    return store.dispatch("shopping/customItem/create", item);
  };

  const onAddCustomItem = async (option: DropdownOption) => {
    const id = await addCustomItem({ name: option.label });
    const item = id + "-" + AddedItemOptionType.CUSTOM;
    options.value?.push({ value: item, label: option.label });
    selectedItem.value = item;
  };

  return {
    onAddCustomItem,
  };
}
