import { onBeforeMount, ref, Ref, ComputedRef } from "vue";
import { useStore } from "vuex";
import { isEqual } from "date-fns";
import { CalendarDay } from "@/types/calendar";

export function useCalendar(allDatesInRange: ComputedRef<Date[]>) {
  const store = useStore();
  const calendar: Ref<CalendarDay[] | undefined> = ref();
  const isLoadingCalendar = ref(false);

  onBeforeMount(() => {
    loadCalendar();
  });

  const loadCalendar = async () => {
    isLoadingCalendar.value = true;
    calendar.value = await getCalendar();
    addMissingDaysToCalendar();
    isLoadingCalendar.value = false;
  };

  const addMissingDaysToCalendar = () => {
    calendar.value = allDatesInRange.value.map((date) => {
      const calendarDay = getCalendarDayByDate(date);

      if (calendarDay) {
        return calendarDay;
      }

      return {
        date,
        items: [],
      };
    });
  };

  const getCalendarDayByDate = (date: Date) => {
    return calendar.value?.find((day) => isEqual(day.date, date));
  };

  const getCalendar = () => {
    const datesRange = {
      fromDate: allDatesInRange.value[0],
      toDate: allDatesInRange.value[allDatesInRange.value.length - 1],
    };
    return store.dispatch("calendar/getCalendar", datesRange);
  };

  const deleteDateFromCalendar = (id: number, date: Date) => {
    const day = getCalendarDayByDate(date);
    const itemToRemove = day?.items.find((item) => item.id === id);

    if (!(itemToRemove && day)) {
      return;
    }
    const indexOfItemToRemove = day.items.indexOf(itemToRemove);
    day.items.splice(indexOfItemToRemove, 1);
    store.dispatch("calendar/deleteDateFromCalendar", id);
  };

  return {
    loadCalendar,
    isLoadingCalendar,
    getCalendarDayByDate,
    deleteDateFromCalendar,
  };
}
