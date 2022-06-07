<script lang="ts">
import CList from "@/components/data-display/list/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";

export default {
  name: "RecipesListView",
  components: { CList, CDisplayTags },
};
</script>

<script setup lang="ts">
import { onMounted } from "vue";
import { useListWithFilters } from "@/composables/list-with-filters";
import { isEmpty } from "lodash";

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
  loadListAndSaveFiltersToStorage,
  getFiltersFromStorage,
  availableTags,
  isLoadingAvailableTags,
  filters,
  filterBySearchPhrase,
  filterByTags,
  handleListLoadingProccess,
} = useListWithFilters(
  "recipesList",
  "recipe/getRecipesList",
  "recipe/loadRecipesList",
  "recipe/isLoadingRecipesList",
  "recipe/getAvailableRecipesTags",
  recipesListDefaultFilters
);

onMounted(() => {
  const storedFilters = getFiltersFromStorage();

  if (!isEmpty(storedFilters)) {
    filters.value = storedFilters;
  }

  handleListLoadingProccess();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
