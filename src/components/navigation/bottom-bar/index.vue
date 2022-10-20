<script lang="ts">
export default {
  name: "CBottomBar",
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
import { useSwipeScreen } from "./composables/swipe-screen";
import { ref, computed, reactive } from "vue";
import { RouterLink } from "vue-router";
const { windowWidth } = useWindowSize();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

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
const wrapperCurrentTranslateX = computed(
  () => windowWidth.value * activeListIndex.value
);
const wrapperWidth = computed(
  () => windowWidth.value * (mobileListLimits.length - 1)
);

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

const swipeConfig = reactive(
  useSwipeScreen(
    slideLeft,
    slideRight,
    wrapperCurrentTranslateX,
    -wrapperWidth.value,
    0
  )
);

const getActiveIndicatorClass = (index: number) => {
  if (index - 1 === activeListIndex.value) {
    return "active";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
