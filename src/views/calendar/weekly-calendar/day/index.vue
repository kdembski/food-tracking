<script lang="ts">
import Draggable from "vuedraggable";
import WeeklyCalendarDayItem from "../day-item/index.vue";

export default {
  name: "WeeklyCalendarDay",
  components: {
    Draggable,
    WeeklyCalendarDayItem,
  },
};
</script>

<script setup lang="ts">
import { inject, ref } from "vue";
import { CalendarDay, CalendarItem } from "@/types/calendar/calendar";
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
});

const emits = defineEmits<{
  (event: "edit", item: CalendarItem, date: Date): void;
  (event: "clone", item: CalendarItem, date: Date): void;
  (event: "update", day: CalendarDay): void;
  (event: "delete", id: number, date: Date): void;
}>();

const getFormattedDate = inject("getFormattedDate");
const isDragging = ref(false);

const getContainerClasses = () => {
  return [getActiveClass()];
};

const getActiveClass = () => {
  if (isToday(props.date)) {
    return "calendar-day--active";
  }
  return "";
};

const onDragStart = () => {
  document.body.classList.add("grabbing");
  isDragging.value = true;
};

const onDragEnd = () => {
  document.body.classList.remove("grabbing");
  isDragging.value = false;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
