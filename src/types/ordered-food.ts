import { ListWithFilters } from "@/types/components/list";

export interface OrderedFoodState {
  orderedFoodList: OrderedFoodList | null;
  isLoadingOrderedFoodList: boolean;
  orderedFoodTags: string | null;
  isLoadingOrderedFoodTags: boolean;
}

export interface OrderedFood {
  id: number;
  foodName: string;
  placeName: string;
  tags: string;
  orderDate: Date;
  orderDatesInCurrentMonth: Date[];
}

export type OrderedFoodList = ListWithFilters<OrderedFood>;
