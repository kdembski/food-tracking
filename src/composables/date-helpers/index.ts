import { formatWithOptions } from "date-fns/esm/fp";
import { pl } from "date-fns/locale";
import { useMonthHelpers } from "./month-helpers";
import { useWeekHelpers } from "./week-helpers";

export function useDateHelpers(isMonthlyMode?: () => boolean | undefined) {
  const getFormattedDate = (date: Date, format: string) => {
    return formatWithOptions({ locale: pl }, format, date);
  };

  const incrementDate = () => {
    if (isMonthlyMode?.()) {
      return incrementMonth();
    }
    return incrementWeek();
  };

  const decrementDate = () => {
    if (isMonthlyMode?.()) {
      return decrementMonth();
    }
    return decrementWeek();
  };

  const getDateRange = () => {
    if (isMonthlyMode?.()) {
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
  };
}
