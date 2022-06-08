<script lang="ts">
export default { name: "CSkeletonLoader" };
</script>

<script setup lang="ts">
const props = defineProps({
  itemsCount: {
    type: Number,
    default: 0,
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
