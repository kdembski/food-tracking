import { ListWithFilters } from "@/types/components/list";

export interface IngredientCategoryState {
  ingredientCategory: IngredientCategory | null;
  isLoadingIngredientCategory: boolean;

  ingredientCategoriesList: IngredientCategoriesList | null;
  isLoadingIngredientCategoriesList: boolean;
  isSubmittingIngredientCategory: boolean;

  ingredientCategoryOptions: IngredientCategoryOption[] | null;
  isLoadingIngredientCategoryOptions: boolean;
}

export interface IngredientCategory {
  id: number;
  name: string;
}

export interface IngredientCategoryOption {
  id: number;
  name: string;
}

export type IngredientCategoriesList = ListWithFilters<IngredientCategory>;
