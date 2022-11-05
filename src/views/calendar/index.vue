<script lang="ts">
import CCalendarMode from "@/components/controls/calendar-mode/index.vue";
import MonthlyCalendar from "./monthly-calendar/index.vue";
import WeeklyCalendar from "./weekly-calendar/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "CalendarView",
  components: { CCalendarMode, MonthlyCalendar, WeeklyCalendar, CButton },
};
</script>

<script setup lang="ts">
import { ref, provide, nextTick } from "vue";
import { useDateHelpers } from "@/composables/date-helpers/index";
import { useWindowSize } from "@/composables/window-size";
import { useCalendarModes } from "@/components/controls/calendar-mode/composables/calendar-modes";

const { calendarModes, isMonthlyMode, isWeeklyMode } = useCalendarModes();
const { isMobile } = useWindowSize();

const monthlyCalendar = ref();
const weeklyCalendar = ref();
const calendarMode = ref(calendarModes.WEEKLY);

const onArrowLeftClick = async () => {
  decrementDate();
  await nextTick();
  loadCalendar();
};

const onArrowRightClick = async () => {
  incrementDate();
  await nextTick();
  loadCalendar();
};

const loadCalendar = () => {
  if (isWeeklyMode(calendarMode.value)) {
    weeklyCalendar.value?.loadWeeklyCalendar();
  }

  if (isMonthlyMode(calendarMode.value)) {
    monthlyCalendar.value?.loadMonthlyCalendar();
  }
};

const {
  getFormattedDate,
  firstDateInMonth,
  allDatesInMonth,
  fullMonthGrid,
  firstDateInWeek,
  getWeekDays,
  allDatesInWeek,
  incrementDate,
  decrementDate,
  getDateRange,
} = useDateHelpers(calendarMode);

provide("getFormattedDate", getFormattedDate);
provide("getWeekDays", getWeekDays);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
