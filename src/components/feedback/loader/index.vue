<template src="./template.html"></template>

<script lang="ts">
import { defineProps, defineComponent } from "vue";

export default defineComponent({ name: "CLoader" });
</script>

<script setup lang="ts">
const { circleHeight = 55, circleWidth = 55 } = defineProps<{
  circleHeight: number;
  circleWidth: number;
}>();

const calculateStrokeWidth = () => {
  return (200 / (circleWidth + 30)).toFixed(1);
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
