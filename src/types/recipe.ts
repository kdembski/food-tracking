import { ListWithFilters } from "./list";

export interface RecipeState {
  recipesList: RecipeList | null;
  isLoadingRecipesList: boolean;
  recipesTags: string | null;
  isLoadingRecipesTags: boolean;
  recipesSearchSuggestions: string[] | null;
  isLoadingRecipesSearchSuggestions: boolean;
}

export interface Recipe {
  recipeName: string;
  preparationTime: number;
  tags: string;
}

export type RecipeList = ListWithFilters<Recipe>;
