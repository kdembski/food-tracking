export interface ShoppingItem {
  id: number;
  shoppingListId?: number;
  recipeId?: number | null;
  ingredientCategoryId?: number | null;
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
  shoppingListId: number | null;
  isLoadingCollection: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  webSocket: WebSocket | null;
  itemToMove: ShoppingItem | null;
}

export interface RecipeShoppingItems {
  recipeId?: number | null;
  items: ShoppingItem[];
}

export interface CategoryShoppingItems {
  categoryId?: number | null;
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

export interface SelectedShoppingItem {
  id: number;
  type: AddedItemOptionType;
}

export interface DraggableEventConfig {
  target: HTMLElement;
  x: number;
  y: number;
}
