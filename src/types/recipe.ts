import { ListWithFilters } from "./list";

export interface RecipeState {
  recipesList: RecipeList | null;
  isLoadingRecipesList: boolean;
  recipesTags: RecipeList | null;
  isLoadingRecipesTags: boolean;
}

export interface Recipe {
  recipeName: string;
  preparationTime: number;
  tags: string;
}

export type RecipeList = ListWithFilters<Recipe>;
