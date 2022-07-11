<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import CCard from "@/components/surfaces/card/index.vue";

export default {
  name: "CList",
  components: { CSkeletonLoader, CCard },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "@/components/utils/composables/window-size";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const itemsCount = computed(() => props.items.length);
const { windowHeight, isMobile } = useWindowSize();

const getLoaderItemsCount = () => {
  const containerHeight = windowHeight.value - 100;
  return Math.floor(containerHeight / (isMobile.value ? 115 : 125));
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
