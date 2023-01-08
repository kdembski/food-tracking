import { onBeforeMount, ref, Ref, ComputedRef, watch, computed } from "vue";
import { useStore } from "vuex";
import { CalendarDay, CalendarItem } from "@/types/calendar/calendar";
import { useToastNotification } from "@/composables/toast-notification";
import { cloneDeep } from "lodash";

export function useCalendar(allDatesInRange: ComputedRef<Date[]>) {
  const store = useStore();
  const toastNotification = useToastNotification();
  const isLoadingCalendar = computed(() => store.state.calendar.isLoadingDays);
  const updatePromises: Ref<any[]> = ref([]);

  onBeforeMount(() => {
    loadCalendar();
  });

  const loadCalendar = async (selectedMembers?: number[]) => {
    store.dispatch("calendar/loadDays", {
      allDatesInRange: allDatesInRange.value,
      selectedMembers,
    });
  };

  const getCalendarDayByDate: (date: Date) => CalendarDay = (date) => {
    return store.getters["calendar/getDayByDate"](date);
  };

  const addCalendarItem = (item: CalendarItem, date: Date) => {
    return store.dispatch("calendar/addItem", { date, ...item });
  };

  const cloneCalendarItem = (item: CalendarItem, date: Date) => {
    const clone = cloneDeep(item);
    addCalendarItem(clone, date)
      .then((response) => {
        toastNotification.success("Zduplikowano.");

        const id = response.data.insertId;
        const day = getCalendarDayByDate(date);
        clone.id = id;
        day?.items.push(clone);
      })
      .catch(() => {
        toastNotification.error("Duplikowanie nie powiodło się.");
      });
  };

  const deleteCalendarItem = (id: number, date: Date) => {
    const day = getCalendarDayByDate(date);
    const itemToRemove = day?.items.find((item) => item.id === id);

    if (!(itemToRemove && day)) {
      return;
    }
    const indexOfItemToRemove = day.items.indexOf(itemToRemove);
    day.items.splice(indexOfItemToRemove, 1);
    store.dispatch("calendar/deleteItem", id);
  };

  const updateCalendarItem = (item: CalendarItem, date: Date) => {
    return store.dispatch("calendar/updateItem", {
      ...item,
      date,
    });
  };

  const updateCalendarDay = (calendarDay: CalendarDay) => {
    const date = calendarDay.date;
    const items = calendarDay.items;

    updateDayItemsSortOrder(items);

    const promises = items.map((item) => {
      return updateCalendarItem(item, date);
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
        toastNotification.error("Aktualizacja kalendarza nie powiodła się.");
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
    deleteCalendarItem,
    updateCalendarDay,
    updateCalendarItem,
    cloneCalendarItem,
    addCalendarItem,
  };
}
