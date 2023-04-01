import { ShoppingItem } from "./item";

export interface ShoppingList {
  id: number;
  name: string;
  count: number;
}

export interface ShoppingListState {
  all: ShoppingList[] | null;
  isLoading: boolean;
  isSubmitting: boolean;
}

export enum ShoppingListNavItems {
  DEFAULT = "DEFAULT",
  BY_RECIPE = "BY_RECIPE",
  BY_CATEGORY = "BY_CATEGORY",
}
