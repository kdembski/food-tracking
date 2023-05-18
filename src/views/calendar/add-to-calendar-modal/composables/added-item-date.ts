import { OrderedFood } from "@/types/ordered-food/ordered-food";
import { Recipe } from "@/types/recipes/recipe";
import { isAfter } from "date-fns";
import { ComputedRef, Ref } from "vue";

export function useAddedItemDate(
  selectedDates: Ref<Date[]>,
  addedRecipe: ComputedRef<Recipe | undefined>,
  addedOrderedFood: ComputedRef<OrderedFood | undefined>
) {
  const updateAddedItemDate = () => {
    updateAddedRecipeDate();
    updateAddedOrderedFoodDate();
  };

  const updateAddedRecipeDate = () => {
    if (!addedRecipe.value) {
      return;
    }

    const lastSelectedDate = getLastSelectedDate();
    if (shouldUpdateRecipeDate(lastSelectedDate)) {
      addedRecipe.value.cookedDate = lastSelectedDate;
    }
  };

  const shouldUpdateRecipeDate = (lastSelectedDate: Date) => {
    return (
      !addedRecipe.value?.cookedDate ||
      isAfter(lastSelectedDate, addedRecipe.value.cookedDate)
    );
  };

  const updateAddedOrderedFoodDate = () => {
    if (!addedOrderedFood.value) {
      return;
    }

    const lastSelectedDate = getLastSelectedDate();
    if (shouldUpdateOrderedFoodDate(lastSelectedDate)) {
      addedOrderedFood.value.orderDate = lastSelectedDate;
    }
  };

  const shouldUpdateOrderedFoodDate = (lastSelectedDate: Date) => {
    return (
      !addedOrderedFood.value?.orderDate ||
      isAfter(lastSelectedDate, addedOrderedFood.value.orderDate)
    );
  };

  const getLastSelectedDate = () => {
    return selectedDates.value[selectedDates.value.length - 1];
  };

  return { updateAddedItemDate };
}
