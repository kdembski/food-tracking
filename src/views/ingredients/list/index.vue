<script lang="ts">
import EditIngedientModal from "./edit-modal/index.vue";
import CustomizedTable from "../customized-table/index.vue";

export default {
  name: "IngredientsList",
  components: { CustomizedTable, EditIngedientModal },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { IngredientsFilters } from "@/types/ingredients/ingredient";
import { ListFilters } from "@/types/components/data-display/list";

const store = useStore();
const isEditModalOpen = ref(false);

const ingredientsListDefaultFilters: ListFilters<IngredientsFilters> = {
  currentPage: 1,
  pageSize: 20,
  sortAttribute: "id",
  sortDirection: "asc",
  custom: {
    searchPhrase: "",
  },
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
  {
    value: "buttons",
  },
];

const isSubmittingIngredient = computed(() => {
  return store.state.ingredient.isSubmitting;
});

const deleteIngredient = (id: number) => {
  return store.dispatch("ingredient/delete", id);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
