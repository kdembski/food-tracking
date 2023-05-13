<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";
import CInput from "@/components/controls/inputs/input/index.vue";
import CAutocomplete from "@/components/controls/inputs/autocomplete/index.vue";
import CMultiInput from "@/components/controls/inputs/multi-input/index.vue";
import CRadio from "@/components/controls/radio/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import EditIngredientModalLoader from "./loader/index.vue";
import { useStoredErrors } from "@/composables/stored-errors";

export default {
  name: "EditIngredientModal",
  components: {
    CButton,
    CInput,
    CModal,
    CAutocomplete,
    CMultiInput,
    CRadio,
    EditIngredientModalLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, watch } from "vue";
import { cloneDeep } from "lodash";
import { useIngredient } from "./composables/ingredient";
import { useUnits } from "./composables/units";
import { useCategories } from "./composables/categories";
import { MultiInputValuesTypes } from "@/types/components/multi-input";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  ingredientId: {
    type: Number,
    default: null,
  },
});

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
  (event: "success"): void;
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    clearAllErrors();
    emits("update:isOpen", value);
  },
});

watch(_isOpen, (value) => {
  ingredient.value = cloneDeep(emptyIngredient);
  if (!value) {
    return;
  }
  setCategoryOptions();
  setUnitOptions();

  if (!isAddingNewIngredient.value) {
    setIngredient();
  }
});

const closeModal = () => {
  _isOpen.value = false;
};

const isLoading = computed(
  () =>
    isLoadingIngredient.value ||
    isLoadingUnitOptions.value ||
    isLoadingCategoryOptions.value
);

const submit = async () => {
  if (isAddingNewIngredient.value) {
    await createIngredient();
    emits("success");
    closeModal();
    return;
  }

  await updateIngredient();
  emits("success");
  closeModal();
};

const getTitle = () => {
  if (isAddingNewIngredient.value) {
    return "Dodaj składnik";
  }
  return "Edytuj składnik";
};

const getSubmitButtonLabel = () => {
  if (isAddingNewIngredient.value) {
    return "Dodaj";
  }
  return "Zapisz";
};

const {
  selectedPrimaryIndex,
  emptyIngredient,
  ingredient,
  isAddingNewIngredient,
  isLoadingIngredient,
  isSubmitting,
  setIngredient,
  updateIngredient,
  createIngredient,
  onUnitRemove,
} = useIngredient(props);

const { errors, getErrorMessage, clearError, clearAllErrors } =
  useStoredErrors("ingredient");

const { unitOptions, isLoadingUnitOptions, setUnitOptions } = useUnits();
const { categoryOptions, isLoadingCategoryOptions, setCategoryOptions } =
  useCategories();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
