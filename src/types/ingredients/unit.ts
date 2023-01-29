import { ListWithFilters } from "@/types/components/data-display/list";

export interface IngredientUnitState {
  single: IngredientUnit | null;
  isLoading: boolean;

  list: IngredientUnitsList | null;
  isLoadingList: boolean;
  isSubmitting: boolean;

  options: IngredientUnitOption[] | null;
  isLoadingOptions: boolean;
}

export interface IngredientUnit {
  id: number;
  name: string;
  shortcut: string;
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
