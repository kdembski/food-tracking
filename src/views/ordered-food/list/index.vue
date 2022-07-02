<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CLink from "@/components/utils/link/index.vue";

export default {
  name: "OrderedFoodListView",
  components: { CListWithFilters, CDisplayTags, CButton, CLink },
};
</script>

<script setup lang="ts">
const orderedFoodListDefaultFilters = {
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "foodName",
  sortDirection: "asc",
  tags: "",
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
