<script lang="ts">
export default { name: "CLoader" };
</script>

<script setup lang="ts">
import { defineProps } from "vue";

const { circleHeight = 55, circleWidth = 55 } = defineProps<{
  circleHeight: number;
  circleWidth: number;
}>();

const calculateStrokeWidth = () => {
  return (200 / (circleWidth + 30)).toFixed(1);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
