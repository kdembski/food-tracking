<script lang="ts">
import CTable from "@/components/data-display/table/index.vue";

export default {
  name: "IngredientsListView",
  components: { CTable },
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
    getItemColumnValue: (value: string[]) => value.join(", "),
  },
];
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
