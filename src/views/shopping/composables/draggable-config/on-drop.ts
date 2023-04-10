import { ShoppingList } from "@/types/shopping/list";
import { useShoppingHelpers } from "../helpers";
import { useToastNotification } from "@/composables/toast-notification";
import { useStore } from "vuex";
import { ShoppingItem, SummedUpShoppingItem } from "@/types/shopping/item";

export function useShoppingItemDraggableConfigOnDrop() {
  const { isSummedUpItem } = useShoppingHelpers();
  const toastNotification = useToastNotification();
  const store = useStore();

  const onDrop = (e: any, list: ShoppingList, isListActive: boolean) => {
    if (isListActive) {
      return;
    }

    const item = JSON.parse(e.dataTransfer.getData("item"));
    if (isSummedUpItem(item)) {
      updateSummedUpItem(item, list);
      return;
    }

    updateItem(item, list);
  };

  const updateItem = (item: ShoppingItem, list: ShoppingList) => {
    removeItemsFromStored([item], list);

    item.shoppingListId = list.id;
    store.dispatch("shopping/item/update", item).then(() => {
      showSuccessMessage(list);
    });
  };

  const updateSummedUpItem = (
    summedUpItem: SummedUpShoppingItem,
    list: ShoppingList
  ) => {
    removeItemsFromStored(summedUpItem.items, list);

    const promises = summedUpItem.items.map((item) => {
      item.shoppingListId = list.id;
      return store.dispatch("shopping/item/update", item);
    });

    Promise.all(promises).then(() => {
      showSuccessMessage(list);
    });
  };

  const removeItemsFromStored = (
    itemsToRemove: ShoppingItem[],
    list: ShoppingList
  ) => {
    const items: ShoppingItem[] = store.state.shopping.item.collection;
    const filteredItems = items.filter((item) => {
      return !itemsToRemove.some((itemToRemove) => itemToRemove.id === item.id);
    });
    store.commit("shopping/item/setCollection", filteredItems);

    const countDifference = items.length - filteredItems.length;
    updateListsCount(list, countDifference);
  };

  const updateListsCount = (list: ShoppingList, countDifference: number) => {
    list.count += countDifference;

    const currentListId = store.state.shopping.item.shoppingListId;
    const currentList: ShoppingList | undefined =
      store.getters["shopping/list/getById"](currentListId);

    if (!currentList) {
      return;
    }
    currentList.count -= countDifference;
  };

  const showSuccessMessage = (list: ShoppingList) => {
    toastNotification.success(
      'Przeniesiono przedmiot do listy: "' + list.name + '"'
    );
  };

  return {
    onDrop,
  };
}
