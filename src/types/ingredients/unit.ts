import { List } from "@/types/components/data-display/list";
import { ApiError } from "../api";

export interface IngredientUnitState {
  single: IngredientUnit | null;
  isLoading: boolean;

  list: IngredientUnitsList | null;
  isLoadingList: boolean;
  isSubmitting: boolean;

  options: IngredientUnitOption[] | null;
  isLoadingOptions: boolean;

  errors: IngredientUnitErrors | null;
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

export type IngredientUnitsList = List<IngredientUnit>;

export interface IngredientUnitsFilters {
  searchPhrase: string;
}

export interface IngredientUnitErrors {
  name: ApiError;
  shortcut: ApiError;
}
