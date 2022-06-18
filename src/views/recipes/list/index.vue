<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "RecipesListView",
  components: { CListWithFilters, CDisplayTags, CButton },
};
</script>

<script setup lang="ts">
const recipesListColumns = [
  {
    label: "Nazwa przepisu",
    value: "recipeName",
    sortable: true,
  },
  {
    label: "Tagi",
    value: "tags",
  },
];

const recipesListDefaultFilters = {
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "recipeName",
  sortDirection: "asc",
  tags: "",
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
