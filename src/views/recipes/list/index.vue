<script lang="ts">
import CTable from "@/components/data-display/table/index.vue";
import CTags from "@/components/data-display/tags/index.vue";

export default {
  name: "RecipesListView",
  components: { CTable, CTags },
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useList } from "@/composables/list";
import { isEmpty } from "lodash";

const filters = ref({
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "",
  sortDirection: "",
});

const {
  list,
  isLoadingList,
  loadListAndSaveFiltersToStorage,
  getFiltersFromStorage,
} = useList(
  "recipesList",
  "recipe/getRecipesList",
  "recipe/loadRecipesList",
  "recipe/isLoadingRecipesList"
);

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

const onTagClick = (tag: string) => {
  filters.value.searchPhrase = tag;
  loadListAndSaveFiltersToStorage(filters.value);
};

onMounted(() => {
  const storedFilters = getFiltersFromStorage();

  if (!isEmpty(storedFilters)) {
    filters.value = storedFilters;
  }

  loadListAndSaveFiltersToStorage(filters.value);
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
