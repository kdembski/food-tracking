import { ListWithFilters } from "@/types/components/list";

export interface IngredientState {
  ingredient: Ingredient | null;
  isLoadingIngredient: boolean;

  ingredientsList: IngredientsList | null;
  isLoadingIngredientsList: boolean;
  isSubmittingIngredient: boolean;

  ingredientOptions: IngredientOption[] | null;
  isLoadingIngredientOptions: boolean;
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
