<script lang="ts">
import CList from "@/components/data-display/list/index.vue";
import CTags from "@/components/data-display/tags/index.vue";

export default {
  name: "RecipesListView",
  components: { CList, CTags },
};
</script>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useList } from "@/composables/list";
import { isEmpty } from "lodash";
import { ListFilters } from "@/types/list";

const filters: Ref<ListFilters> = ref({
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "",
  sortDirection: "",
  tags: "",
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

const filterBySearchPhrase = (phrase: string) => {
  filters.value.searchPhrase = phrase;
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
