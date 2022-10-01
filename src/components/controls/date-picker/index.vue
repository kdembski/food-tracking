<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import MonthlyDatePicker from "./monthly-date-picker/index.vue";
import WeeklyDatePicker from "./weekly-date-picker/index.vue";
import CCalendarMode from "@/components/utils/calendar-mode/index.vue";

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

const calendarMode = ref("");

const calendarModeRef = ref<{
  isMonthlyMode: () => void;
  isWeeklyMode: () => void;
}>();

const incrementDate = () => {
  if (calendarModeRef.value?.isMonthlyMode()) {
    return incrementMonth();
  }
  return incrementWeek();
};

const decrementDate = () => {
  if (calendarModeRef.value?.isMonthlyMode()) {
    return decrementMonth();
  }
  return decrementWeek();
};

const getDatePickerRange = () => {
  if (calendarModeRef.value?.isMonthlyMode()) {
    return getFormattedDate(firstDateInMonth.value, "LLLL yyyy");
  }

  return (
    getFormattedDate(allDatesInWeek.value[0], "d MMM") +
    " - " +
    getFormattedDate(allDatesInWeek.value[6], "d MMM")
  );
};

const {
  getFormattedDate,
  incrementMonth,
  decrementMonth,
  fullMonthGrid,
  firstDateInMonth,
  firstDateInWeek,
  getWeekDays,
  allDatesInWeek,
  incrementWeek,
  decrementWeek,
} = useDateHelpers();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
