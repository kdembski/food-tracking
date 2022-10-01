<script lang="ts">
export default {
  name: "MonthlyDatePicker",
};
</script>

<script setup lang="ts">
import { isDate } from "lodash";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Array as () => Array<Date>,
    required: true,
  },
  getFormattedDate: {
    type: Function,
    required: true,
  },
  fullMonthGrid: {
    type: Array,
    required: true,
  },
  weekDays: {
    type: Array,
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

const getItemDisabledClass = (item: number | Date) => {
  if (!isDate(item)) {
    return "monthly-date-picker__item--disabled";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
