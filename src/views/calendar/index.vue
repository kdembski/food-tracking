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

const monthlyCalendar = ref();
const weeklyCalendar = ref();

const onArrowLeftClick = async () => {
  decrementDate();
  await nextTick();
  weeklyCalendar.value?.loadWeeklyCalendar();
};

const onArrowRightClick = async () => {
  incrementDate();
  await nextTick();
  weeklyCalendar.value?.loadWeeklyCalendar();
};

const calendarMode = ref("WEEKLY");
const calendarModeRef = ref<{
  isMonthlyMode: () => boolean;
  isWeeklyMode: () => boolean;
}>();

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
} = useDateHelpers(() => calendarModeRef.value?.isMonthlyMode());

provide("getFormattedDate", getFormattedDate);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
