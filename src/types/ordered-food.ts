import { ListWithFilters } from "./list";

export interface OrderedFoodState {
  orderedFoodList: OrderedFoodList | null;
  isLoadingOrderedFoodList: boolean;
  orderedFoodTags: string | null;
  isLoadingOrderedFoodTags: boolean;
}

export interface OrderedFood {
  foodName: string;
  placeName: string;
  tags: string;
}

export type OrderedFoodList = ListWithFilters<OrderedFood>;
