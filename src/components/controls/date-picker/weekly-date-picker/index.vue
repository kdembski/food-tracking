<script lang="ts">
export default {
  name: "WeeklyDatePicker",
};
</script>

<script setup lang="ts">
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
  allDatesInWeek: {
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
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
