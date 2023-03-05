import {
  isEqual,
  isFuture,
  getDate,
  getMonth,
  getYear,
  addDays,
} from "date-fns";
import { ref } from "vue";
import { useDateHelpers } from "@/composables/date-helpers/index";

export function useRecipeHelpers() {
  const { getDistanceInWords } = useDateHelpers();
  const isPlanned = ref(false);

  const getPreparationTime = (time: number) => {
    const minutes = time % 60;
    const hours = Math.floor(time / 60);

    if (hours && minutes) {
      return hours + "h " + minutes + "m";
    }

    if (hours) {
      return hours + "h";
    }

    return minutes + "m";
  };

  const getFormattedCookedDate = (cookedDate: Date) => {
    if (!cookedDate) {
      return "Brak";
    }

    const today = new Date();
    const todayWithoutHours = new Date(
      getYear(today),
      getMonth(today),
      getDate(today),
      0,
      0,
      0
    );

    const distance = getDistanceInWords(todayWithoutHours, cookedDate);

    if (isEqual(todayWithoutHours, cookedDate)) {
      return "Dzisiaj";
    }

    if (isFuture(cookedDate)) {
      isPlanned.value = true;
      return "Zaplanowane";
    }

    if (isEqual(todayWithoutHours, addDays(cookedDate, 1))) {
      return "Wczoraj";
    }

    return distance + " temu";
  };

  const getKcal = (kcal: number) => {
    if (!kcal) {
      return "Brak";
    }

    return kcal + " kcal";
  };

  return {
    isPlanned,
    getFormattedCookedDate,
    getPreparationTime,
    getKcal,
  };
}
