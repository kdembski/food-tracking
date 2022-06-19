<script lang="ts">
export default {
  name: "CMobileSidebar",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

let touchStartX = 0;
let touchEndX = 0;
const activeListIndex = ref(0);
const mobileListLimits = [
  {
    start: 0,
    end: 4,
  },
  {
    start: 4,
    end: 8,
  },
];

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX;
};
const onTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX;
  slideMobileSidebar();
};

const slideMobileSidebar = () => {
  const touchDifferenceX = touchStartX - touchEndX;
  if (Math.abs(touchDifferenceX) < 50) {
    return;
  }
  if (touchDifferenceX > 0) {
    slideLeft();
  }
  if (touchDifferenceX < 0) {
    slideRight();
  }
};

const slideLeft = () => {
  if (activeListIndex.value >= mobileListLimits.length - 1) {
    return;
  }
  activeListIndex.value++;
};
const slideRight = () => {
  if (activeListIndex.value <= 0) {
    return;
  }
  activeListIndex.value--;
};

const getActiveIndicatorClass = (index: number) => {
  if (index - 1 === activeListIndex.value) {
    return "active";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
