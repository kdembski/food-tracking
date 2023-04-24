import { OrderedFood } from "../ordered-food/ordered-food";
import { Recipe } from "../recipes/recipe";

export interface CalendarDay {
  date: Date;
  items: CalendarItem[];
}

export interface CalendarItem {
  id: number;
  recipeId?: number;
  orderedFoodId?: number;
  members: number[];
  name: string;
  tags: string;
  sortOrder: number | null;
}

export interface CalendarState {
  days: CalendarDay[] | null;
  isLoadingDays: boolean;

  isAddToCalendarModalOpen: boolean;
  addedRecipe: Recipe | null;
  addedOrderedFood: OrderedFood | null;
}
