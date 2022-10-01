import { formatWithOptions } from "date-fns/esm/fp";
import { pl } from "date-fns/locale";
import { useMonthHelpers } from "./month-helpers";
import { useWeekHelpers } from "./week-helpers";

export function useDateHelpers() {
  const getFormattedDate = (date: Date, format: string) => {
    return formatWithOptions({ locale: pl }, format, date);
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
  };
}
