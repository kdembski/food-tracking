<script lang="ts">
export default { name: "CSkeletonLoader" };
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    backgroundColor?: string;
  }>(),
  { backgroundColor: "primary" }
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
