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
import { ref } from "vue";

const orderedFoodListDefaultFilters = {
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "foodName",
  sortDirection: "asc",
  tags: "",
};

const orderedFoodListSortOptions = ref([
  {
    value: {
      sortAttribute: "foodName",
      sortDirection: "asc",
    },
    label: "Nazwa jedzenia - rosnąco",
    icon: "arrow-down-a-z",
  },
  {
    value: {
      sortAttribute: "foodName",
      sortDirection: "desc",
    },
    label: "Nazwa jedzenia - malejąco",
    icon: "arrow-down-z-a",
  },
  {
    value: {
      sortAttribute: "placeName",
      sortDirection: "asc",
    },
    label: "Nazwa miejsca - rosnąco",
    icon: "arrow-down-a-z",
  },
  {
    value: {
      sortAttribute: "placeName",
      sortDirection: "desc",
    },
    label: "Nazwa miejsca - malejąco",
    icon: "arrow-down-z-a",
  },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
