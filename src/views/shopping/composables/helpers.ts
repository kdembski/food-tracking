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
          id: item.id,
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
          summedUpItem.amount += getItemConvertedAmount(item) || 0;
        }
        summedUpItem.itemIds.push(item.id);
        summedUpItem.items.push(item);
        return accum;
      }

      accum.push({
        ingredientId: item.ingredientId,
        ingredientName: item.ingredientName,
        unitShortcut: item.primaryUnitShortcut,
        amount: getItemConvertedAmount(item),
        isChecked: item.isChecked,
        itemIds: [item.id],
        items: [item],
      });
      return accum;
    }, []);
  };

  const getItemConvertedAmount = (item?: ShoppingItem) => {
    if (item?.isPrimary) {
      return item.amount;
    }
    return (item?.amount || 1) * (item?.converterToPrimary || 1);
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

  const sortByIds = (
    items?: CategoryShoppingItems[] | RecipeShoppingItems[]
  ) => {
    if (!items) {
      return [];
    }

    return [...items].sort((a, b) => {
      const aId = a["categoryId"] || a["recipeId"];
      const bId = b["categoryId"] || b["recipeId"];

      if (aId === null) {
        return 1;
      }

      if (bId === null) {
        return -1;
      }

      return bId - aId;
    });
  };

  return {
    sumUpItemsWithSameIngredient,
    isSummedUpItems,
    isSummedUpItem,
    sortByIds,
  };
}
