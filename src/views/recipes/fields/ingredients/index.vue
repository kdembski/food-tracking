<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";
import CInput from "@/components/controls/inputs/input/index.vue";
import CAutocomplete from "@/components/controls/inputs/autocomplete/index.vue";
import CMultiInput from "@/components/controls/inputs/multi-input/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "RecipeIngredientsFields",
  components: {
    CButton,
    CInput,
    CAutocomplete,
    CMultiInput,
    CLoader,
    CSkeletonLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onBeforeUnmount, ref } from "vue";
import { MultiInputValuesTypes } from "@/types/components/multi-input";
import { RecipeIngredient } from "@/types/recipes/recipeIngredient";
import { useIngredients } from "./composables/ingredients";
import { useStoredErrors } from "@/composables/stored-errors";

const props = defineProps<{
  modelValue: Partial<RecipeIngredient>[];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: Partial<RecipeIngredient>[]): void;
}>();

const recipeIngredients = computed({
  get(): Partial<RecipeIngredient>[] {
    return props.modelValue;
  },
  set(value: Partial<RecipeIngredient>[]) {
    emits("update:modelValue", value);
  },
});

const isLoading = ref(false);

const getComponentInput = (component: string, index: number) => {
  return document
    .getElementsByClassName("ingredients-fields")[0]
    ?.getElementsByClassName("ingredients-fields__item")
    [index]?.getElementsByClassName("item__" + component)[0]
    ?.getElementsByTagName("input")[0];
};

const {
  ingredients,
  ingredientsOptions,
  isLoadingIngredients,
  isLoadingUnits,
  unitAutocompleteKeys,
  setIngredient,
  setIngredientsOptions,
  onIngredientRemove,
  fillIngredients,
  getIngredientUnitOptions,
  onUnitUpdate,
} = useIngredients(recipeIngredients, getComponentInput);

onBeforeMount(async () => {
  isLoading.value = true;
  await setIngredientsOptions();
  await fillIngredients();
  await nextTick();
  isLoading.value = false;

  if (recipeIngredients.value.length === 0) {
    recipeIngredients.value = [{}];
  }
});

const { errors, getErrorMessage, clearError, clearAllErrors } =
  useStoredErrors("recipe/ingredient");

onBeforeUnmount(() => {
  clearAllErrors();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
