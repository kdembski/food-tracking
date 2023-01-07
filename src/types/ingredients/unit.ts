import { ListWithFilters } from "@/types/components/list";

export interface IngredientUnitState {
  ingredientUnit: IngredientUnit | null;
  isLoadingIngredientUnit: boolean;

  ingredientUnitsList: IngredientUnitsList | null;
  isLoadingIngredientUnitsList: boolean;
  isSubmittingIngredientUnit: boolean;

  ingredientUnitOptions: IngredientUnitOption[] | null;
  isLoadingIngredientUnitOptions: boolean;
}

export interface IngredientUnit {
  id: number;
  name: string;
  shortcut: string;
}

export interface IngredientUnitOption {
  id: number;
  name: string;
}

export type IngredientUnitsList = ListWithFilters<IngredientUnit>;
