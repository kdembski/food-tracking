<script lang="ts">
import MonthlyCalendarDay from "./day/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "MonthlyCalendar",
  components: { MonthlyCalendarDay, CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useCalendar } from "../composables/calendar";
import { isDate } from "date-fns";

const props = defineProps({
  allDatesInMonth: {
    type: Array as () => Date[],
    required: true,
  },

  fullMonthGrid: {
    type: Array,
    required: true,
  },
});

const {
  loadCalendar: loadMonthlyCalendar,
  isLoadingCalendar,
  getCalendarDayByDate,
  deleteCalendarItem,
  updateCalendarDay,
} = useCalendar(computed(() => props.allDatesInMonth));

const getWeekDays = inject("getWeekDays");

const getContainerElement = () => {
  return isLoadingCalendar.value ? "c-skeleton-loader" : "div";
};

defineExpose({ loadMonthlyCalendar });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
