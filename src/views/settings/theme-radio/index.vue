<script lang="ts">
import ThemeSvg from "../theme-svg/index.vue";

export default {
  name: "ThemeRadioInput",
  components: { ThemeSvg },
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  code: string;
  caption: string;
  name: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selected = computed({
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
