export interface ShoppingList {
  id: number;
  name: string;
  count: number;
  recipeIds: number[];
}

export interface ShoppingListState {
  single: ShoppingList | null;
  all: ShoppingList[] | null;
  isLoading: boolean;
  isLoadingAll: boolean;
  isSubmitting: boolean;
  isDeletingItems: boolean;
  webSocket: WebSocket | null;
}

export enum ShoppingListNavItems {
  DEFAULT = "DEFAULT",
  BY_RECIPE = "BY_RECIPE",
  BY_CATEGORY = "BY_CATEGORY",
}
