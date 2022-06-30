<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "OrderedFoodListView",
  components: { CListWithFilters, CDisplayTags, CButton },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const orderedFoodListDefaultFilters = {
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "foodName",
  sortDirection: "asc",
  tags: "",
};

const totalOrderedFoodAmount = computed(() => {
  if (store.getters["orderedFood/isLoadingOrderedFoodList"]) {
    return;
  }

  const totalAmount =
    store.getters["orderedFood/getOrderedFoodList"]?.pagination?.totalRecords;
  return "(" + totalAmount + ")";
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
