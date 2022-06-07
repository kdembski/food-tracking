<script lang="ts">
import CList from "@/components/data-display/list/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";

export default {
  name: "RecipesListView",
  components: { CList, CDisplayTags },
};
</script>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useListWithFilters } from "@/composables/list-with-filters";
import { isEmpty } from "lodash";
import { ListFilters } from "@/types/list";
import { useStore } from "vuex";
import { useRecipesFiltering } from "./composables/recipes-filtering";
const store = useStore();

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

const {
  list,
  isLoadingList,
  loadListAndSaveFiltersToStorage,
  getFiltersFromStorage,
} = useListWithFilters(
  "recipesList",
  "recipe/getRecipesList",
  "recipe/loadRecipesList",
  "recipe/isLoadingRecipesList"
);

const {
  availableTags,
  isLoadingAvailableTags,
  filters,
  filterBySearchPhrase,
  filterByTags,
  handleRecipesListLoading,
} = useRecipesFiltering(loadListAndSaveFiltersToStorage);

onMounted(() => {
  const storedFilters = getFiltersFromStorage();

  if (!isEmpty(storedFilters)) {
    filters.value = storedFilters;
  }

  handleRecipesListLoading();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
