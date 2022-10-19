import { ListWithFilters } from "@/types/components/list";

export interface RecipeState {
  recipesList: RecipesList | null;
  isLoadingRecipesList: boolean;
  recipesTags: string | null;
  isLoadingRecipesTags: boolean;
  recipesSearchSuggestions: string[] | null;
  isLoadingRecipesSearchSuggestions: boolean;
}

export interface Recipe {
  id: number;
  recipeName: string;
  preparationTime: number;
  tags: string;
  cookidooLink: string;
  cookedDate: Date;
  cookedDatesInCurrentMonth: Date[];
}

export type RecipesList = ListWithFilters<Recipe>;
