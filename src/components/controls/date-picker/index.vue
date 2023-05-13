<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";
import MonthlyDatePicker from "./monthly-date-picker/index.vue";
import WeeklyDatePicker from "./weekly-date-picker/index.vue";
import CCalendarMode from "@/components/controls/custom/calendar-mode/index.vue";

export default {
  name: "CDatePicker",
  components: { CButton, MonthlyDatePicker, WeeklyDatePicker, CCalendarMode },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDateHelpers } from "@/composables/date-helpers/index";
import { useCalendarModes } from "../custom/calendar-mode/composables/calendar-modes";

const props = defineProps({
  modelValue: {
    type: Array as () => Array<Date>,
    required: true,
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: Date[]): void;
}>();

const selected = computed({
  get(): Date[] {
    return props.modelValue;
  },
  set(value: Date[]) {
    emits("update:modelValue", value);
  },
});

const clearSelected = () => {
  selected.value = [];
};

const { calendarModes, isMonthlyMode, isWeeklyMode } = useCalendarModes();
const calendarMode = ref(calendarModes.WEEKLY);

const {
  getFormattedDate,
  fullMonthGrid,
  firstDateInMonth,
  firstDateInWeek,
  getWeekDays,
  allDatesInWeek,
  incrementDate,
  decrementDate,
  getDateRange,
} = useDateHelpers(calendarMode);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
