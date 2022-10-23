import { onBeforeMount, ref, Ref, ComputedRef, watch } from "vue";
import { useStore } from "vuex";
import { isEqual } from "date-fns";
import { CalendarDay, CalendarItem } from "@/types/calendar";
import { useToastNotification } from "@/composables/toast-notification";

export function useCalendar(allDatesInRange: ComputedRef<Date[]>) {
  const store = useStore();
  const toastNotification = useToastNotification();
  const calendar: Ref<CalendarDay[] | undefined> = ref();
  const isLoadingCalendar = ref(false);
  const updatePromises: Ref<any[]> = ref([]);

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

  const updateCalendarDay = (calendarDay: CalendarDay) => {
    const date = calendarDay.date;
    const items = calendarDay.items;

    updateDayItemsSortOrder(items);

    const promises = items.map((item) => {
      return store.dispatch("calendar/updateDateInCalendar", {
        date,
        ...item,
      });
    });

    updatePromises.value = updatePromises.value.concat(promises);
  };

  watch(updatePromises, (promises) => {
    if (promises.length === 0) {
      return;
    }

    Promise.all(promises)
      .then(() => {
        toastNotification.success("Kalendarz zaktualizowany pomyślnie!");
        updatePromises.value = [];
      })
      .catch(() => {
        toastNotification.error("Nie udało sie zaktualizować kalendarza.");
        updatePromises.value = [];
      });
  });

  const updateDayItemsSortOrder = (items: CalendarItem[]) => {
    items.forEach((item, index) => {
      item.sortOrder = index;
    });
  };

  return {
    loadCalendar,
    isLoadingCalendar,
    getCalendarDayByDate,
    deleteDateFromCalendar,
    updateCalendarDay,
  };
}
