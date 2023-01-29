<script lang="ts">
export default {
  name: "CRadio",
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean | string | number | null;
  label?: string;
  isDisabled?: boolean;
}>();

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number | boolean | null): void;
}>();

const value = computed({
  get(): string | number | boolean | null {
    return props.modelValue;
  },
  set(value: string | number | boolean | null) {
    emits("update:modelValue", value);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
