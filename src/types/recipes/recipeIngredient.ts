import { ApiError } from "./../api";

export interface RecipeIngredient {
  id: number;
  recipeId: number;
  ingredientId: number;
  unitId: number;
  amount: number;
  ingredientName: string;
  unitShortcut: string;
  kcalPerUnit: number;
  isPrimary: boolean;
  converterToPrimary: number;
}
export interface RecipeIngredientFilterOption {
  id: number;
  count: number;
}

export interface RecipeIngredientState {
  collection: RecipeIngredient[] | null;
  isLoadingCollection: boolean;
  isSubmittingCollection: boolean;
  errors: RecipeIngredientsErrors[] | null;
  filterOptions: RecipeIngredientFilterOption[] | null;
  isLoadingFilterOptions: boolean;
}

export interface RecipeIngredientsErrors {
  ingredientId: ApiError;
  unitId: ApiError;
  amount: ApiError;
}
