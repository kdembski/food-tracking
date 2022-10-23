<script lang="ts">
import WeeklyCalendarDay from "./day/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "WeeklyCalendar",
  components: { WeeklyCalendarDay, CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { defineExpose, computed } from "vue";
import { useCalendar } from "../composables/calendar";

const props = defineProps({
  allDatesInWeek: {
    type: Array as () => Date[],
    required: true,
  },
});

const {
  loadCalendar: loadWeeklyCalendar,
  isLoadingCalendar,
  getCalendarDayByDate,
  deleteDateFromCalendar,
  updateCalendarDay,
} = useCalendar(computed(() => props.allDatesInWeek));

const getContainerElement = () => {
  return isLoadingCalendar.value ? "c-skeleton-loader" : "div";
};

defineExpose({ loadWeeklyCalendar });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
