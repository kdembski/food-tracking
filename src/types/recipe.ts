export interface RecipeState {
  recipesList: Array<Recipe> | null;
  isLoadingRecipesList: boolean;
}

export interface Recipe {
  recipeName: string;
}
