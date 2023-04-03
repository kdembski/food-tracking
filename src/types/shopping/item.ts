export interface ShoppingItem {
  id: number;
  shoppingListId?: number;
  recipeId?: number;
  ingredientCategoryId?: number;
  ingredientUnitId?: number;
  ingredientId?: number;
  customItemId?: number;
  amount?: number;
  isChecked: boolean;
  checkedAt?: Date;
  isRemoved: boolean;
  ingredientName?: string;
  unitShortcut?: string;
  customItemName?: string;
  isPrimary: boolean;
  converterToPrimary?: number;
}

export interface ShoppingItemState {
  collection: ShoppingItem[] | null;
  isLoadingCollection: boolean;
  isSubmitting: boolean;
}

export interface RecipeShoppingItems {
  recipeId?: number;
  items: ShoppingItem[];
}

export interface CategoryShoppingItems {
  categoryId?: number;
  items: ShoppingItem[] | SummedUpShoppingItem[];
}

export interface SummedUpShoppingItem {
  id?: number;
  ingredientId?: number;
  ingredientName?: string;
  unitShortcut?: string;
  customItemName?: string;
  amount?: number;
  isChecked: boolean;
  itemIds: number[];
  items: ShoppingItem[];
}

export enum AddedItemOptionType {
  INGREDIENT = "ingredient",
  CUSTOM = "custom",
}
