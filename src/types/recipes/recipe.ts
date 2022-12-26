import { ListWithFilters } from "@/types/components/list";
import { Tag } from "../components/tags";

export interface RecipeState {
  recipe: Recipe | null;
  isLoadingRecipe: boolean;
  recipesList: RecipesList | null;
  isLoadingRecipesList: boolean;
  recipesTags: Tag[] | null;
  isLoadingRecipesTags: boolean;
  recipesSearchSuggestions: string[] | null;
  isLoadingRecipesSearchSuggestions: boolean;
  isSubmittingRecipe: boolean;
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
