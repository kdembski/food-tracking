<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";

export default {
  name: "RecipesListView",
  components: { CListWithFilters, CDisplayTags },
};
</script>

<script setup lang="ts">
import { onMounted } from "vue";
import { useListWithFilters } from "@/composables/list-with-filters";

const recipesListColumns = [
  {
    label: "Nazwa przepisu",
    value: "recipeName",
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
  sortAttribute: "",
  sortDirection: "",
  tags: "",
};

const {
  list,
  isLoadingList,
  availableTags,
  isLoadingAvailableTags,
  filters,
  filterBySearchPhrase,
  filterByTags,
  loadListOnMounted,
  clearListFilters,
} = useListWithFilters(
  "recipesList",
  "recipe/getRecipesList",
  "recipe/loadRecipesList",
  "recipe/isLoadingRecipesList",
  "recipe/getAvailableRecipesTags",
  recipesListDefaultFilters
);

onMounted(() => {
  loadListOnMounted();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
