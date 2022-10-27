import { useToastNotification } from "@/composables/toast-notification";
import { useStore } from "vuex";
import { ref, Ref, ComputedRef } from "vue";
import { Recipe } from "@/types/recipe";
import { OrderedFood } from "@/types/ordered-food";
import { isAfter } from "date-fns";
import { useRouter } from "vue-router";

export function useAddToCalendar(
  selectedDates: Ref<Date[]>,
  portions: Ref<number[]>,
  isOpen: Ref<boolean>,
  addedRecipe: ComputedRef<Recipe | undefined>,
  addedOrderedFood: ComputedRef<OrderedFood | undefined>
) {
  const isAddingToCalendar = ref(false);
  const store = useStore();
  const toastNotification = useToastNotification();
  const router = useRouter();

  const addSelectedDatesToCalendar = () => {
    isAddingToCalendar.value = true;

    const promises = selectedDates.value.map((date, index) => {
      return store.dispatch("calendar/addDateToCalendar", {
        date,
        recipeId: addedRecipe.value?.id,
        orderedFoodId: addedOrderedFood.value?.id,
        portions: portions.value[index],
      });
    });

    Promise.all(promises)
      .then(() => {
        isAddingToCalendar.value = false;
        isOpen.value = false;
        updateAddedItemDates();

        const pushRouterToCalendar = () => router.push("/calendar");
        toastNotification.success(
          "Udało sie dodać do kalendarza.",
          pushRouterToCalendar,
          "Otwórz Kalendarz"
        );
      })
      .catch((error) => {
        toastNotification.error("Dodawanie do kalendarza nie powiodło się.");
        console.log(error);
      });
  };

  const updateAddedItemDates = () => {
    updateAddedRecipeDates();
    updateAddedOrderedFood();
  };

  const updateAddedRecipeDates = () => {
    if (!addedRecipe.value) {
      return;
    }

    const lastSelectedDate = getLastSelectedDate();
    if (isAfter(lastSelectedDate, addedRecipe.value.cookedDate)) {
      addedRecipe.value.cookedDate = lastSelectedDate;
    }

    addedRecipe.value.cookedDatesInCurrentMonth =
      addedRecipe.value.cookedDatesInCurrentMonth.concat(selectedDates.value);
  };

  const updateAddedOrderedFood = () => {
    if (!addedOrderedFood.value) {
      return;
    }

    const lastSelectedDate = getLastSelectedDate();
    if (isAfter(lastSelectedDate, addedOrderedFood.value.orderDate)) {
      addedOrderedFood.value.orderDate = lastSelectedDate;
    }

    if (!addedOrderedFood.value.orderDatesInCurrentMonth) {
      return;
    }

    addedOrderedFood.value.orderDatesInCurrentMonth =
      addedOrderedFood.value.orderDatesInCurrentMonth.concat(
        selectedDates.value
      );
  };

  const getLastSelectedDate = () => {
    return selectedDates.value[selectedDates.value.length - 1];
  };

  return {
    addSelectedDatesToCalendar,
    isAddingToCalendar,
  };
}
