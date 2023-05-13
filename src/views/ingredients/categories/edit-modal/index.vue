<script lang="ts">
import CInput from "@/components/controls/inputs/input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import { IngredientCategory } from "@/types/ingredients/category";

export default {
  name: "EditCategoryModal",
  components: {
    CInput,
    CModal,
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cloneDeep } from "lodash";
import { useStoredErrors } from "@/composables/stored-errors";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  categoryId: {
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
  category.value = cloneDeep(emptyCategory);
  if (!value) {
    return;
  }

  if (!isAddingNewCategory.value) {
    setCategory();
  }
});

const emptyCategory: Partial<IngredientCategory> = {
  name: "",
};

const category = ref(cloneDeep(emptyCategory));
const isAddingNewCategory = computed(() => !props.categoryId);
const isLoading = computed(() => store.state.ingredient.category.isLoading);
const isSubmitting = computed(
  () => store.state.ingredient.category.isSubmitting
);

const setCategory = async () => {
  await store.dispatch("ingredient/category/load", props.categoryId);
  category.value = store.state.ingredient.category.single;
};

const updateCategory = () => {
  return store.dispatch("ingredient/category/update", category.value);
};

const createCategory = () => {
  return store.dispatch("ingredient/category/create", category.value);
};

const closeModal = () => {
  _isOpen.value = false;
};

const submit = async () => {
  if (isAddingNewCategory.value) {
    await createCategory();
    emits("success");
    closeModal();
    return;
  }

  await updateCategory();
  emits("success");
  closeModal();
};

const getTitle = () => {
  if (isAddingNewCategory.value) {
    return "Dodaj kategorię";
  }
  return "Edytuj kategorię";
};

const getSubmitButtonLabel = () => {
  if (isAddingNewCategory.value) {
    return "Dodaj";
  }
  return "Zapisz";
};

const { errors, getErrorMessage, clearError, clearAllErrors } = useStoredErrors(
  "ingredient/category"
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
