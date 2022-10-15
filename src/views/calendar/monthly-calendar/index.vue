<script lang="ts">
import MonthlyCalendarDate from "./day/index.vue";

export default {
  name: "MonthlyCalendar",
  components: { MonthlyCalendarDate },
};
</script>

<script setup lang="ts">
import { defineExpose, computed, inject } from "vue";
import { useLoadCalendar } from "../composables/load-calendar";
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
} = useLoadCalendar(computed(() => props.allDatesInMonth));

const getWeekDays = inject("getWeekDays");

defineExpose({ loadMonthlyCalendar });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
