export interface CalendarDay {
  date: Date;
  items: CalendarItem[];
}

export interface CalendarItem {
  id: number;
  recipeId?: number;
  orderedFoodId?: number;
  isRecipe?: boolean;
  isOrderedFood?: boolean;
  portions: number;
  name: string;
  tags: string;
  sortOrder: number;
}
