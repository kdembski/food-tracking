<script lang="ts">
export default {
  name: "CCheckbox",
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: unknown;
  label?: string;
  isDisabled?: boolean;
}>();

const emits = defineEmits<{
  (event: "update:modelValue", value: unknown): void;
}>();

const value = computed({
  get(): unknown {
    return props.modelValue;
  },
  set(value: unknown) {
    emits("update:modelValue", value);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
