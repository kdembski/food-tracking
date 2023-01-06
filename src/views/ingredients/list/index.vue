<script lang="ts">
import CTableWithFilters from "@/components/data-display/listings/table-with-filters/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "IngredientsList",
  components: { CTableWithFilters, CButton },
};
</script>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();

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
  {
    value: "editButton",
  },
];

const isEditModalOpen = ref(false);
const editedIngredientId: Ref<number | undefined> = ref();

const onAddButtonClick = () => {
  editIngredient();
};

const editIngredient = (id?: number) => {
  editedIngredientId.value = id;
  isEditModalOpen.value = true;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
