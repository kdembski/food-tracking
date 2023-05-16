<script lang="ts">
import EditUnitModal from "./edit-modal/index.vue";
import CustomizedTable from "../customized-table/index.vue";

export default {
  name: "UnitsList",
  components: { CustomizedTable, EditUnitModal },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { IngredientUnitsFilters } from "@/types/ingredients/unit";
import { ListFilters } from "@/types/components/data-display/list";

const store = useStore();
const isEditModalOpen = ref(false);

const unitsListDefaultFilters: ListFilters<IngredientUnitsFilters> = {
  currentPage: 1,
  pageSize: 50,
  sortAttribute: "id",
  sortDirection: "asc",
  custom: {
    searchPhrase: "",
  },
};

const unitsListColumns = [
  { value: "id", label: "ID", sortable: true },
  { value: "name", label: "Nazwa", sortable: true },
  { value: "shortcut", label: "Skrót", sortable: true },
  {
    value: "buttons",
  },
];

const isSubmittingUnit = computed(() => {
  return store.state.ingredient.unit.isSubmitting;
});

const deleteUnit = (id: number) => {
  return store.dispatch("ingredient/unit/delete", id);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
