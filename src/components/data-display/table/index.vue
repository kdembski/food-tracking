<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import CSortingTrigger from "./sorting-trigger/index.vue";
export default {
  name: "CList",
  components: { CSkeletonLoader, CSortingTrigger },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
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
  columns: {
    type: Array,
    required: true,
  },
  getItemColumnValue: {
    type: Function,
    default: (value: string | number) => value,
  },
});

const columnsCount = computed(() => props.columns.length);
const itemsCount = computed(() => props.items.length);

const { windowHeight, isMobile } = useWindowSize();
const container: Ref<HTMLElement | undefined> = ref();

const getLoaderRowsCount = () => {
  const containerOffsetTop = container.value?.offsetTop;
  const containerHeight = windowHeight.value - (containerOffsetTop || 0);
  return Math.floor(containerHeight / (isMobile.value ? 65 : 80));
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
