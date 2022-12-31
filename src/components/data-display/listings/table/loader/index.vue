<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CTableLoader",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
import { computed } from "vue";

const props = defineProps({
  container: {
    type: Object,
    deafult: () => ({}),
  },
  columnsCount: {
    type: Number,
    required: true,
  },
});

const { windowHeight, isMobile } = useWindowSize();

const loaderRowsCount = computed(() => {
  const containerOffsetTop = props.container?.offsetTop;
  const containerHeight = windowHeight.value - (containerOffsetTop || 0);
  return Math.floor(containerHeight / (isMobile.value ? 65 : 80));
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
