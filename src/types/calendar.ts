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
  members: number[];
  name: string;
  tags: string;
  sortOrder: number;
}

export interface CalendarState {
  calendar: CalendarDay[] | null;
  isLoadingCalendar: boolean;
}
