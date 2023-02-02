<script lang="ts">
import CTableWithFilters from "@/components/data-display/listings/table-with-filters/index.vue";
import CButton from "@/components/controls/button/index.vue";
import EditIngedientModal from "./edit-modal/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";

export default {
  name: "IngredientsList",
  components: { CTableWithFilters, CButton, EditIngedientModal, CModal },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();
const store = useStore();

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

const table: Ref<{ handleListLoadingProccess: () => void } | undefined> = ref();

const isEditModalOpen = ref(false);
const editedIngredientId: Ref<number | undefined> = ref();

const onAddButtonClick = () => {
  editIngredient();
};

const editIngredient = (id?: number) => {
  editedIngredientId.value = id;
  isEditModalOpen.value = true;
};

const isDeleteModalOpen = ref(false);
const deletedIngredientId: Ref<number | undefined> = ref();

const isSubmittingIngredient = computed(() => {
  return store.state.ingredient.isSubmitting;
});

const openDeleteModal = (id: number) => {
  isDeleteModalOpen.value = true;
  deletedIngredientId.value = id;
};

const deleteIngredient = () => {
  store
    .dispatch("ingredient/delete", deletedIngredientId.value)
    .then(() => table.value?.handleListLoadingProccess())
    .finally(() => {
      isDeleteModalOpen.value = false;
    });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
