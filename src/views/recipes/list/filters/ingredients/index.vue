<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CCheckbox from "@/components/controls/checkbox/index.vue";
import CButton from "@/components/controls/button/index.vue";
import IngredientsFilterLoader from "./loader/index.vue";

export default {
  name: "RecipesListIngredientsFilter",
  components: { CInput, CCheckbox, CButton, IngredientsFilterLoader },
};
</script>

<script setup lang="ts">
import { useRecipeListIngredientFilterOptions } from "./composables/options";
import { ListFilters } from "@/types/components/data-display/list";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps<{
  filters: ListFilters;
  handleListLoadingProccess: () => void;
  isLoadingList: boolean;
}>();

const searchPhrase = ref("");
const isExpanded = ref(false);

const onChange = () => {
  props.handleListLoadingProccess();
  searchPhrase.value = "";
  isExpanded.value = false;
};

const getExpandButtonConfig = () => {
  if (isExpanded.value) {
    return {
      label: "Pokaż mniej",
      icon: "chevron-up",
    };
  }
  return {
    label: "Pokaż więcej",
    icon: "chevron-down",
  };
};

const {
  options,
  isLoading,
  getIngredientName,
  isOptionSelected,
  isExpandable,
} = useRecipeListIngredientFilterOptions(
  searchPhrase,
  isExpanded,
  computed(() => props.filters)
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
