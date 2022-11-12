<script lang="ts">
export default {
  name: "CTooltip",
};
</script>

<script setup lang="ts">
import { computed, ref, Ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/composables/window-size";

const { windowWidth, windowHeight, isMobile } = useWindowSize();
const store = useStore();
const content: Ref<HTMLElement | undefined> = ref();
const tooltipTop = ref(0);
const tooltipLeft = ref(0);

const isOpen = computed(() => {
  return store.state.isTooltipOpen;
});

const config = computed(() => {
  return store.state.tooltipConfig;
});

const getLeftPosition = (
  parentLeft: number,
  parentWidth: number,
  contentWidth: number
) => {
  const left = parentLeft + parentWidth / 2;

  if (left - contentWidth / 2 < 12) {
    return contentWidth / 2 + 12;
  }

  if (left + contentWidth / 2 > windowWidth.value - 10) {
    return windowWidth.value - contentWidth / 2 - 12;
  }

  return left;
};

const getTopPosition = (
  parentBottom: number,
  parentHeight: number,
  contentHeight: number
) => {
  const gapFromParent = 15;
  const top = parentBottom + gapFromParent;

  if (top + contentHeight > windowHeight.value - 10) {
    return parentBottom - parentHeight - contentHeight - gapFromParent;
  }

  return top;
};

watch(
  [config, isOpen],
  async ([config]) => {
    if (!document.body.contains(config?.parent)) {
      tooltipTop.value = -999;
      tooltipLeft.value = -999;
      return;
    }

    await nextTick();
    const contentHeight = content.value?.getBoundingClientRect().height || 0;
    const contentWidth = content.value?.getBoundingClientRect().width || 0;

    const {
      bottom: parentBottom,
      left: parentLeft,
      width: parentWidth,
      height: parentHeight,
    } = config.parent.getBoundingClientRect();

    tooltipTop.value = getTopPosition(
      parentBottom,
      parentHeight,
      contentHeight
    );
    tooltipLeft.value = getLeftPosition(parentLeft, parentWidth, contentWidth);
  },
  { deep: true, immediate: true }
);

const getTooltipStyle = () => {
  return {
    left: tooltipLeft.value + "px",
    top: tooltipTop.value + "px",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
