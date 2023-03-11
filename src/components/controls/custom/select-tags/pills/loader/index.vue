<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "SelectTagsLoader",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
const props = defineProps({
  containerWidth: {
    type: Number,
    default: 0,
  },
});

const getLoaderItemsCount = () => {
  return Math.floor((props.containerWidth || 0) / 70);
};

const getHalfOfLoaderItemsCount = () => {
  return Math.floor(getLoaderItemsCount() / 2);
};

const getLoaderRowGridTemplateColumns = () => {
  return "grid-template-columns: repeat(" + getLoaderItemsCount() + ", 1fr);";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
