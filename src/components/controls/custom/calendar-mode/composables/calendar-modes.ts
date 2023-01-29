export function useCalendarModes() {
  const calendarModes = {
    MONTHLY: "MONTHLY",
    WEEKLY: "WEEKLY",
  };

  const isMonthlyMode = (mode: string | undefined) => {
    return mode === calendarModes.MONTHLY;
  };

  const isWeeklyMode = (mode: string | undefined) => {
    return mode === calendarModes.WEEKLY;
  };

  return {
    calendarModes,
    isMonthlyMode,
    isWeeklyMode,
  };
}
