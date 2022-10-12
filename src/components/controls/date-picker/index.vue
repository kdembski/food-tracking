<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import MonthlyDatePicker from "./monthly-date-picker/index.vue";
import WeeklyDatePicker from "./weekly-date-picker/index.vue";
import CCalendarMode from "@/components/controls/calendar-mode/index.vue";

export default {
  name: "CDatePicker",
  components: { CButton, MonthlyDatePicker, WeeklyDatePicker, CCalendarMode },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDateHelpers } from "@/composables/date-helpers/index";

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

const calendarMode = ref("WEEKLY");

const calendarModeRef = ref<{
  isMonthlyMode: () => boolean;
  isWeeklyMode: () => boolean;
}>();

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
} = useDateHelpers(() => calendarModeRef.value?.isMonthlyMode());
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
