export interface ShoppingItem {
  id: number;
  shoppingListId?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  customItemId?: number;
  amount?: number;
  isChecked?: boolean;
  checkedAt?: Date;
  isRemoved?: boolean;
  ingredientName?: string;
  unitShortcut?: string;
  customItemName?: string;
}

export interface ShoppingItemState {
  collection: ShoppingItem[] | null;
  isLoadingCollection: boolean;
  isSubmitting: boolean;
}
