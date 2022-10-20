<script lang="ts">
import Draggable from "vuedraggable";
import WeeklyCalendarDayItem from "./item/index.vue";

export default {
  name: "WeeklyCalendarDay",
  components: {
    Draggable,
    WeeklyCalendarDayItem,
  },
};
</script>

<script setup lang="ts">
import { inject } from "vue";
import { useStore } from "vuex";
import { CalendarDay, CalendarItem } from "@/types/calendar";
import { isToday } from "date-fns";

const props = defineProps({
  calendarDay: {
    type: Object as () => CalendarDay,
    default: () => ({}),
  },
  date: {
    type: Date,
    required: true,
  },
  isLoadingCalendar: {
    type: Boolean,
    default: false,
  },
  deleteDateFromCalendar: {
    type: Function,
    default: null,
  },
});

const store = useStore();
const getFormattedDate = inject("getFormattedDate");

const onMove = () => {
  const date = props.calendarDay.date;
  const items = props.calendarDay.items;

  updateDayItemsSortOrder(items);

  items.forEach((item) => {
    store.dispatch("calendar/updateDateInCalendar", {
      date,
      ...item,
    });
  });
};

const updateDayItemsSortOrder = (items: CalendarItem[]) => {
  items.forEach((item, index) => {
    item.sortOrder = index;
  });
};

const deleteDateFromCalendar = (id: number) => {
  props.deleteDateFromCalendar(id, props.calendarDay.date);
};

const getActiveClass = (date: Date) => {
  if (isToday(date)) {
    return "calendar-day--active";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
