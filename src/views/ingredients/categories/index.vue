<script lang="ts">
import EditCategoryModal from "./edit-modal/index.vue";
import CustomizedTable from "../customized-table/index.vue";

export default {
  name: "CategoriesList",
  components: { CustomizedTable, EditCategoryModal },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isEditModalOpen = ref(false);

const categoriesListDefaultFilters = {
  currentPage: 1,
  pageSize: 50,
  searchPhrase: "",
  sortAttribute: "id",
  sortDirection: "asc",
};

const categoriesListColumns = [
  { value: "id", label: "ID", sortable: true },
  { value: "name", label: "Nazwa", sortable: true },
  {
    value: "buttons",
  },
];

const isSubmittingCategory = computed(() => {
  return store.state.ingredient.category.isSubmitting;
});

const deleteCategory = (id: number) => {
  return store.dispatch("ingredient/category/delete", id);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
