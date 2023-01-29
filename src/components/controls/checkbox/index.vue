<script lang="ts">
export default {
  name: "CCheckbox",
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean | string | number;
  label?: string;
  isDisabled?: boolean;
}>();

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number | boolean): void;
}>();

const value = computed({
  get(): string | number | boolean {
    return props.modelValue;
  },
  set(value: string | number | boolean) {
    emits("update:modelValue", value);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
