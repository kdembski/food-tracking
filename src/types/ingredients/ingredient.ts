import { ListWithFilters } from "@/types/components/data-display/list";

export interface IngredientState {
  single: Ingredient | null;
  isLoading: boolean;

  list: IngredientsList | null;
  isLoadingList: boolean;
  isSubmitting: boolean;

  options: IngredientOption[] | null;
  isLoadingOptions: boolean;
}

export interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  unitNames: string[];
}

export interface IngredientOption {
  id: number;
  name: string;
}

export type IngredientsList = ListWithFilters<Ingredient>;

export enum IngredientsNavItems {
  LIST = "LIST",
  UNITS = "UNITS",
  CATEGORIES = "CATEGORIES",
}
