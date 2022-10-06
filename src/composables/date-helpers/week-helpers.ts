import { computed, ref } from "vue";
import {
  startOfWeekWithOptions,
  endOfWeekWithOptions,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
} from "date-fns/esm/fp";

export function useWeekHelpers(
  getFormattedDate: (date: Date, format: string) => string
) {
  const startOfWeek = (date: Date) => {
    return startOfWeekWithOptions({ weekStartsOn: 1 }, date);
  };

  const endOfWeek = (date: Date) => {
    return endOfWeekWithOptions({ weekStartsOn: 1 }, date);
  };

  const getWeekDays = (fullNames = false) => {
    const now = new Date();

    return eachDayOfInterval({
      start: startOfWeek(now),
      end: endOfWeek(now),
    }).map((day) => {
      return getFormattedDate(day, fullNames ? "EEEE" : "EEEEEE");
    });
  };

  const firstDateInWeek = ref(startOfWeek(new Date()));

  const incrementWeek = () => {
    firstDateInWeek.value = addWeeks(1, firstDateInWeek.value);
  };

  const decrementWeek = () => {
    firstDateInWeek.value = subWeeks(1, firstDateInWeek.value);
  };

  const allDatesInWeek = computed(() => {
    const lastDateInWeek = endOfWeek(firstDateInWeek.value);
    return eachDayOfInterval({
      start: firstDateInWeek.value,
      end: lastDateInWeek,
    });
  });

  return {
    firstDateInWeek,
    getWeekDays,
    allDatesInWeek,
    incrementWeek,
    decrementWeek,
  };
}
