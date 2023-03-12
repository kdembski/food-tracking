<script lang="ts">
export default { name: "CLoader" };
</script>

<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    circleHeight?: number;
    circleWidth?: number;
    withOverlay?: boolean;
  }>(),
  { circleHeight: 50, circleWidth: 50, withOverlay: false }
);

const calculateStrokeWidth = () => {
  return (200 / (props.circleWidth + 30)).toFixed(1);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
