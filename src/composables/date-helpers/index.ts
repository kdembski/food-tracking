import { Ref } from "vue";
import { formatWithOptions, formatDistanceWithOptions } from "date-fns/esm/fp";
import { pl } from "date-fns/locale";
import { useMonthHelpers } from "./month-helpers";
import { useWeekHelpers } from "./week-helpers";
import { useCalendarModes } from "@/components/controls/custom/calendar-mode/composables/calendar-modes";

export function useDateHelpers(calendarMode?: Ref<string>) {
  const { isMonthlyMode } = useCalendarModes();

  const getFormattedDate = (date: Date, format: string) => {
    return formatWithOptions({ locale: pl }, format, date);
  };

  const getDistanceInWords = (from: Date, to: Date) => {
    return formatDistanceWithOptions({ locale: pl }, to, from);
  };

  const incrementDate = () => {
    if (isMonthlyMode(calendarMode?.value)) {
      return incrementMonth();
    }
    return incrementWeek();
  };

  const decrementDate = () => {
    if (isMonthlyMode(calendarMode?.value)) {
      return decrementMonth();
    }
    return decrementWeek();
  };

  const getDateRange = () => {
    if (isMonthlyMode(calendarMode?.value)) {
      return getFormattedDate(firstDateInMonth.value, "LLLL yyyy");
    }

    return (
      getFormattedDate(allDatesInWeek.value[0], "d MMM") +
      " - " +
      getFormattedDate(allDatesInWeek.value[6], "d MMM")
    );
  };

  const {
    firstDateInWeek,
    getWeekDays,
    allDatesInWeek,
    incrementWeek,
    decrementWeek,
  } = useWeekHelpers(getFormattedDate);

  const {
    allDatesInMonth,
    fullMonthGrid,
    firstDateInMonth,
    incrementMonth,
    decrementMonth,
  } = useMonthHelpers();

  return {
    getFormattedDate,
    firstDateInMonth,
    allDatesInMonth,
    fullMonthGrid,
    incrementMonth,
    decrementMonth,
    firstDateInWeek,
    getWeekDays,
    allDatesInWeek,
    incrementWeek,
    decrementWeek,
    incrementDate,
    decrementDate,
    getDateRange,
    getDistanceInWords,
  };
}
