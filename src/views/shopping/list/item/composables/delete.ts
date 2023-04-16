import { ref, ComputedRef } from "vue";
import { useStore } from "vuex";
import { useToastNotification } from "@/composables/toast-notification";
import { useShoppingHelpers } from "@/views/shopping/composables/helpers";
import { ShoppingItem, SummedUpShoppingItem } from "@/types/shopping/item";

export function useShoppingItemDelete(
  item: ComputedRef<ShoppingItem | SummedUpShoppingItem>
) {
  const store = useStore();
  const toastNotification = useToastNotification();

  const { isSummedUpItem } = useShoppingHelpers();
  const isDeletingItem = ref(false);

  const handleDeleting = async () => {
    isDeletingItem.value = true;

    if (!isSummedUpItem(item.value)) {
      await deleteItem(item.value);
      afterDelete();
      return;
    }

    await deleteSummedUpItem(item.value);
    afterDelete();
  };

  const deleteItem = (item: ShoppingItem) => {
    if (item.isChecked) {
      return store.dispatch("shopping/item/updateIsRemoved", item);
    }

    return store.dispatch("shopping/item/delete", item.id);
  };

  const deleteSummedUpItem = async (summedUpItem: SummedUpShoppingItem) => {
    const promises = summedUpItem.items.map((item) => {
      return deleteItem(item);
    });
    await Promise.all(promises);
  };

  const afterDelete = () => {
    isDeletingItem.value = false;
    toastNotification.success("Usunięto przedmiot z listy zakupów.");
  };

  return {
    isDeletingItem,
    handleDeleting,
  };
}
