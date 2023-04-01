import {
  CategoryShoppingItems,
  RecipeShoppingItems,
  ShoppingItem,
  SummedUpShoppingItem,
} from "@/types/shopping/item";

export function useShoppingHelpers() {
  const sumUpItemsWithSameIngredient = (items?: ShoppingItem[]) => {
    return items?.reduce((accum: SummedUpShoppingItem[], item) => {
      if (!item.ingredientId) {
        accum.push({
          customItemName: item.customItemName,
          amount: item.amount,
          isChecked: item.isChecked,
          itemIds: [item.id],
          items: [item],
        });
        return accum;
      }

      const summedUpItem = accum.find(
        (summedUpItem: SummedUpShoppingItem) =>
          summedUpItem.ingredientId === item.ingredientId
      );

      if (summedUpItem) {
        if (summedUpItem.amount) {
          summedUpItem.amount += getItemAmountToAdd(item) || 0;
        }
        summedUpItem.itemIds.push(item.id);
        summedUpItem.items.push(item);
        return accum;
      }

      accum.push({
        ingredientId: item.ingredientId,
        ingredientName: item.ingredientName,
        unitShortcut: item.unitShortcut,
        amount: item.amount,
        isChecked: item.isChecked,
        itemIds: [item.id],
        items: [item],
      });
      return accum;
    }, []);
  };

  const getItemAmountToAdd = (item?: ShoppingItem) => {
    if (item?.isPrimary) {
      return item.amount;
    }
    return (item?.amount || 0) * (item?.converterToPrimary || 1);
  };

  const isSummedUpItems = (
    items?: ShoppingItem[] | SummedUpShoppingItem[]
  ): items is SummedUpShoppingItem[] => {
    return (items?.[0] as SummedUpShoppingItem).itemIds !== undefined;
  };

  const isSummedUpItem = (
    item?: ShoppingItem | SummedUpShoppingItem
  ): item is SummedUpShoppingItem => {
    return (item as SummedUpShoppingItem).itemIds !== undefined;
  };

  const sortNullIdsToTheEnd = (
    items?: CategoryShoppingItems[] | RecipeShoppingItems[]
  ) => {
    if (!items) {
      return [];
    }

    return [...items].sort((a, b) => {
      if (a["categoryId"] === null || a["recipeId"] === null) {
        return 1;
      }

      if (b["categoryId"] === null || b["recipeId"] === null) {
        return -1;
      }

      return 0;
    });
  };

  return {
    sumUpItemsWithSameIngredient,
    isSummedUpItems,
    isSummedUpItem,
    sortNullIdsToTheEnd,
  };
}
