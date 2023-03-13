import { ApiError } from "./../api";
import { ListWithFilters } from "@/types/components/data-display/list";
import { Tag } from "../components/utils/tags";

export interface RecipeState {
  single: Recipe | null;
  isLoading: boolean;
  list: RecipesList | null;
  isLoadingList: boolean;
  tags: Tag[] | null;
  isLoadingTags: boolean;
  searchSuggestions: string[] | null;
  isLoadingSearchSuggestions: boolean;
  isSubmitting: boolean;
  errors: RecipeErrors | null;
}

export interface Recipe {
  id: number;
  recipeName: string;
  preparationTime: number;
  tags: string;
  cookidooLink: string;
  cookedDate?: Date;
  datesFromLastYear: Date[][];
}

export type RecipesList = ListWithFilters<Recipe>;

export interface RecipeErrors {
  recipeName: ApiError;
  preparationTime: ApiError;
}
