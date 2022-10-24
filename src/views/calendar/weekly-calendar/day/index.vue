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
import { inject, ref } from "vue";
import { useStore } from "vuex";
import { CalendarDay } from "@/types/calendar";
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
    required: true,
  },
  updateCalendarDay: {
    type: Function,
    required: true,
  },
});

const store = useStore();
const getFormattedDate = inject("getFormattedDate");
const isDragging = ref(false);

const onMove = () => {
  props.updateCalendarDay(props.calendarDay);
};

const deleteDateFromCalendar = (id: number) => {
  props.deleteDateFromCalendar(id, props.calendarDay.date);
};

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
