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
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const recipesListDefaultFilters = {
  currentPage: 1,
  pageSize: 20,
  searchPhrase: "",
  sortAttribute: "recipeName",
  sortDirection: "asc",
  tags: "",
};

const totalRecipesAmount = computed(() => {
  if (store.getters["recipe/isLoadingRecipesList"]) {
    return;
  }

  const totalAmount =
    store.getters["recipe/getRecipesList"]?.pagination?.totalRecords;
  return "(" + totalAmount + ")";
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
