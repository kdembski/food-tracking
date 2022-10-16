<script lang="ts">
import WeeklyCalendarDay from "./day/index.vue";

export default {
  name: "WeeklyCalendar",
  components: { WeeklyCalendarDay },
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
} = useCalendar(computed(() => props.allDatesInWeek));

defineExpose({ loadWeeklyCalendar });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
