export interface RecipeIngredient {
  id: number;
  recipeId: number;
  ingredientId: number;
  unitId: number;
  amount: number;
  ingredientName: string;
  unitShortcut: string;
  kcalPerUnit: number;
  isPrimary: boolean;
  converterToPrimary: number;
}

export interface RecipeIngredientState {
  collection: RecipeIngredient[] | null;
  isLoadingCollection: boolean;
  isSubmittingCollection: boolean;
}
