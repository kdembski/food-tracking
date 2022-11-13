<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import CCard from "@/components/surfaces/card/index.vue";

export default {
  name: "CList",
  components: { CSkeletonLoader, CCard },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useWindowSize } from "@/composables/window-size";

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
const container: Ref<HTMLElement | undefined> = ref();

const getLoaderMaxHeight = () => {
  const containerOffsetTop = container.value?.offsetTop;
  const paddingBottom = isMobile.value ? 20 : 30;
  const containerHeight =
    windowHeight.value -
    (containerOffsetTop || 0) -
    paddingBottom -
    (isMobile.value ? 64 : 0);
  return { maxHeight: containerHeight + "px" };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
