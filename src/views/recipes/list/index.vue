<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CLink from "@/components/utils/link/index.vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "RecipesListView",
  components: { CListWithFilters, CDisplayTags, CButton, InlineSvg, CLink },
};
</script>

<script setup lang="ts">
const recipesListDefaultFilters = {
  currentPage: 1,
  pageSize: 20,
  searchPhrase: "",
  sortAttribute: "recipeName",
  sortDirection: "asc",
  tags: "",
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
