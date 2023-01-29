<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CMultiInput from "@/components/controls/multi-input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";

export default {
  name: "EditIngredientModal",
  components: { CButton, CInput, CModal, CAutocomplete, CMultiInput },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";
import { MultiInputValuesTypes } from "@/types/components/multi-input";
import {
  Ingredient,
  IngredientUnitDetails,
} from "@/types/ingredients/ingredient";
import { DeepPartial } from "@/types/common";

const store = useStore();

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
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
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

const isLoading = computed(
  () =>
    isLoadingIngredient.value ||
    isLoadingUnitOptions.value ||
    isLoadingCategoryOptions.value
);

// ingredient
const emptyIngredient: DeepPartial<Ingredient> = {
  name: "",
  units: [{}],
};

const ingredient = ref(cloneDeep(emptyIngredient));
const isAddingNewIngredient = computed(() => !props.ingredientId);
const isSubmitting = computed(() => {
  return store.state.ingredient.isSubmitting;
});
const isLoadingIngredient = computed(() => store.state.ingredient.isLoading);

const setIngredient = async () => {
  await store.dispatch("ingredient/load", props.ingredientId);
  ingredient.value = store.state.ingredient.single;

  if (ingredient.value.units?.length === 0) {
    ingredient.value.units.push({});
  }
};

const updateIngredient = () => {
  return store.dispatch("ingredient/update", ingredient.value);
};

const createIngredient = () => {
  return store.dispatch("ingredient/create", ingredient.value);
};

// unit
const unitOptions = ref([]);
const isLoadingUnitOptions = computed(
  () => store.state.ingredient.unit.isLoadingOptions
);

const setUnitOptions = async () => {
  await store.dispatch("ingredient/unit/loadOptions");
  unitOptions.value = store.getters["ingredient/unit/options"];
};

// category
const categoryOptions = ref([]);
const isLoadingCategoryOptions = computed(
  () => store.state.ingredient.category.isLoadingOptions
);

const setCategoryOptions = async () => {
  await store.dispatch("ingredient/category/loadOptions");
  categoryOptions.value = store.getters["ingredient/category/options"];
};

// others
const submit = async () => {
  if (isAddingNewIngredient.value) {
    await createIngredient();
    _isOpen.value = false;
    return;
  }

  await updateIngredient();
  _isOpen.value = false;
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
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
