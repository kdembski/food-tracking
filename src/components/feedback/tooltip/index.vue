<script lang="ts">
export default {
  name: "CTooltip",
};
</script>

<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    left?: number;
    top?: number;
    width?: number;
    text?: string;
  }>(),
  { left: 0, top: 0, width: 120 }
);

const getTooltipStyle = () => {
  return {
    left: props.left + "px",
    top: props.top + "px",
    width: props.width + 16 + "px",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
