<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "ListLoader",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useWindowSize } from "@/composables/window-size";

const { windowHeight, isMobile } = useWindowSize();
const container: Ref<HTMLElement | undefined> = ref();

const getLoaderMaxHeight = () => {
  const containerOffsetTop = container.value?.offsetTop;
  const paddingBottom = isMobile.value ? 15 : 25;
  const containerHeight =
    windowHeight.value - (containerOffsetTop || 0) - (isMobile.value ? 64 : 0);
  return { maxHeight: containerHeight + "px" };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
