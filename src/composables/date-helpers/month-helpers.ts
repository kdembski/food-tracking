import { computed, ref } from "vue";
import {
  startOfMonth,
  getDay,
  subMonths,
  addMonths,
  getDaysInMonth,
  lastDayOfMonth,
  eachDayOfInterval,
} from "date-fns/esm/fp";

export function useMonthHelpers() {
  const firstDateInMonth = ref(startOfMonth(new Date()));

  const incrementMonth = () => {
    firstDateInMonth.value = addMonths(1, firstDateInMonth.value);
  };

  const decrementMonth = () => {
    firstDateInMonth.value = subMonths(1, firstDateInMonth.value);
  };

  const allDatesInMonth = computed(() => {
    const lastDateOfMonth = lastDayOfMonth(firstDateInMonth.value);
    return eachDayOfInterval({
      start: firstDateInMonth.value,
      end: lastDateOfMonth,
    });
  });

  const previousMonthPlaceholders = computed(() => {
    const daysInPreviousMonth = getDaysInMonth(
      subMonths(1, firstDateInMonth.value)
    );
    const weekDayOfFirstDateInMonth = getDay(firstDateInMonth.value);

    let numberOfDaysFromPreviousMonth = weekDayOfFirstDateInMonth - 1;
    if (numberOfDaysFromPreviousMonth < 0) {
      numberOfDaysFromPreviousMonth = 6;
    }

    const placeholders: number[] = [];

    for (let i = numberOfDaysFromPreviousMonth - 1; i >= 0; i--) {
      placeholders.push(daysInPreviousMonth - i);
    }

    return placeholders;
  });

  const nextMonthPlaceholders = computed(() => {
    const weekDayOfLastDateInMonth = getDay(
      lastDayOfMonth(firstDateInMonth.value)
    );
    const numberOfDaysFromNextMonth = 7 - weekDayOfLastDateInMonth + 1;
    const placeholders: number[] = [];

    if (numberOfDaysFromNextMonth > 7) {
      return [];
    }

    for (let i = 1; i < numberOfDaysFromNextMonth; i++) {
      placeholders.push(i);
    }

    return placeholders;
  });

  const fullMonthGrid = computed(() => {
    return [
      ...previousMonthPlaceholders.value,
      ...allDatesInMonth.value,
      ...nextMonthPlaceholders.value,
    ];
  });

  return {
    allDatesInMonth,
    fullMonthGrid,
    firstDateInMonth,
    incrementMonth,
    decrementMonth,
  };
}
