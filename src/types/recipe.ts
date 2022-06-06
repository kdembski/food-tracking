import { ListPagination } from "./list";

export interface RecipeState {
  recipesList: RecipeList | null;
  isLoadingRecipesList: boolean;
}

export interface Recipe {
  recipeName: string;
  preparationTime: number;
  tags: string;
}

export interface RecipeList {
  data: Array<Recipe>;
  pagination: ListPagination;
}
