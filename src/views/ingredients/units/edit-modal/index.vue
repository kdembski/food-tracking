<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import { IngredientUnit } from "@/types/ingredients/unit";

export default {
  name: "EditUnitModal",
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
  unitId: {
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
  unit.value = cloneDeep(emptyUnit);
  if (!value) {
    return;
  }

  if (!isAddingNewUnit.value) {
    setUnit();
  }
});

const emptyUnit: Partial<IngredientUnit> = {
  name: "",
  shortcut: "",
};

const unit = ref(cloneDeep(emptyUnit));
const isAddingNewUnit = computed(() => !props.unitId);
const isLoading = computed(() => store.state.ingredient.unit.isLoading);
const isSubmitting = computed(() => store.state.ingredient.unit.isSubmitting);

const setUnit = async () => {
  await store.dispatch("ingredient/unit/load", props.unitId);
  unit.value = store.state.ingredient.unit.single;
};

const updateUnit = () => {
  return store.dispatch("ingredient/unit/update", unit.value);
};

const createUnit = () => {
  return store.dispatch("ingredient/unit/create", unit.value);
};

const closeModal = () => {
  _isOpen.value = false;
};

const submit = async () => {
  if (isAddingNewUnit.value) {
    createUnit().then(() => {
      emits("success");
      closeModal();
    });
    return;
  }

  updateUnit().then(() => {
    emits("success");
    closeModal();
  });
};

const getTitle = () => {
  if (isAddingNewUnit.value) {
    return "Dodaj jednostkę";
  }
  return "Edytuj jednostkę";
};

const getSubmitButtonLabel = () => {
  if (isAddingNewUnit.value) {
    return "Dodaj";
  }
  return "Zapisz";
};

const { errors, getErrorMessage, clearError, clearAllErrors } =
  useStoredErrors("unit");
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
