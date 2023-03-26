import { ShoppingItem } from "./item";

export interface ShoppingList {
  id: number;
  name: string;
  items?: ShoppingItem[];
}

export interface ShoppingListState {
  isLoading: boolean;
  all: ShoppingList[] | null;
  isSubmitting: boolean;
}
