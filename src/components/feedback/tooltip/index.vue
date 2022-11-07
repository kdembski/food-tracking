<script lang="ts">
export default {
  name: "CTooltip",
};
</script>

<script setup lang="ts">
import { computed, ref, Ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const content: Ref<HTMLElement | undefined> = ref();
const contentHeight = ref(0);

const isOpen = computed(() => {
  return store.state.isTooltipOpen;
});

const config = computed(() => {
  return store.state.tooltipConfig;
});

const enableTransitionAll = ref(false);

watch(isOpen, (value) => {
  if (value) {
    setTimeout(() => {
      enableTransitionAll.value = true;
    }, 100);
    return;
  }
  enableTransitionAll.value = false;
});

const getTooltipClasses = () => {
  if (enableTransitionAll.value) {
    return "tooltip--transition-all";
  }
  return "";
};

const getTooltipStyle = () => {
  return {
    left: config.value.left + "px",
    top: config.value.top + "px",
    width: config.value.width + "px",
    height: contentHeight.value + "px",
  };
};

const getTooltipContentStyle = () => {
  return {
    width: config.value.width + "px",
  };
};

const contentResizeObserver = new ResizeObserver(() => {
  const height = content.value?.getBoundingClientRect().height;
  if (!height) {
    contentHeight.value = 0;
    return;
  }

  contentHeight.value = height;
});

onMounted(() => {
  if (!content.value) {
    return;
  }
  contentResizeObserver.observe(content.value);
});

onBeforeUnmount(() => {
  if (!content.value) {
    return;
  }
  contentResizeObserver.unobserve(content.value);
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
