<script lang="ts">
import CTableWithFilters from "@/components/data-display/listings/table-with-filters/index.vue";

export default {
  name: "IngredientsListView",
  components: { CTableWithFilters },
};
</script>

<script setup lang="ts">
const ingredientsListDefaultFilters = {
  currentPage: 1,
  pageSize: 50,
  searchPhrase: "",
  sortAttribute: "id",
  sortDirection: "asc",
};

const ingredientsListColumns = [
  { value: "id", label: "ID", sortable: true },
  { value: "name", label: "Nazwa", sortable: true },
  { value: "categoryName", label: "Kategoria", sortable: true },
  {
    value: "unitNames",
    label: "Jednostki",
    getItemColumnValue: (value: string[]) => value.join("\xa0\xa0|\xa0\xa0"),
  },
];
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
