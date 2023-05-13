<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import MultiInputLoader from "@/components/controls/inputs/multi-input/loader/index.vue";
import InputLoader from "@/components/controls/inputs/input/loader/index.vue";

export default {
  name: "EditIngredientModalLoader",
  components: { CSkeletonLoader, MultiInputLoader, InputLoader },
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
