<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "SelectShoppingListLoader",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
const props = defineProps<{
  columns?: number;
}>();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
