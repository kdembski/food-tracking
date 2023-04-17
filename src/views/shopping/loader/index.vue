<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import ShoppingListLoader from "../list/loader/index.vue";

export default {
  name: "ShoppingLoader",
  components: { CSkeletonLoader, CCard, ShoppingListLoader },
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
