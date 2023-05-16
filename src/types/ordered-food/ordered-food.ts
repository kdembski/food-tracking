import { List } from "@/types/components/data-display/list";
import { Tag } from "../components/utils/tags";

export interface OrderedFoodState {
  list: OrderedFoodList | null;
  isLoadingList: boolean;
  tags: Tag[] | null;
  isLoadingTags: boolean;
  single: OrderedFood | null;
  isSubmitting: boolean;
  isLoading: boolean;
}

export interface OrderedFood {
  id: number;
  foodName: string;
  placeName: string;
  tags: string;
  orderDate?: Date;
  orderDatesInCurrentMonth: Date[];
}

export type OrderedFoodList = List<OrderedFood>;

export interface OrderedFoodFilters {
  searchPhrase: string;
  tags: string;
}
