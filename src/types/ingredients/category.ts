import { ListWithFilters } from "@/types/components/list";

export interface IngredientCategoryState {
  single: IngredientCategory | null;
  isLoading: boolean;

  list: IngredientCategoriesList | null;
  isLoadingList: boolean;
  isSubmitting: boolean;

  options: IngredientCategoryOption[] | null;
  isLoadingOptions: boolean;
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
