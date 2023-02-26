export interface RecipeIngredient {
  id?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  amount?: number;
  ingredientName?: string;
  unitShortcut?: string;
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
}

export interface RecipeIngredientState {
  collection: RecipeIngredient[] | null;
  isLoadingCollection: boolean;
  isSubmittingCollection: boolean;
}
