<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CMultiInput from "@/components/controls/multi-input/index.vue";

export default {
  name: "RecipeIngredientsFields",
  components: {
    CButton,
    CInput,
    CAutocomplete,
    CMultiInput,
  },
};
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, ref } from "vue";
import { MultiInputValuesTypes } from "@/types/components/multi-input";
import { RecipeIngredient } from "@/types/recipes/recipeIngredient";
import { useIngredients } from "./composables/ingredients";

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
    .getElementsByClassName("ingredients-fields__item")
    [index].getElementsByClassName("item__" + component)[0]
    .getElementsByTagName("input")[0];
};

const {
  ingredients,
  ingredientsOptions,
  isLoadingIngredients,
  isLoadingUnits,
  unitAutocompleteKey,
  setIngredient,
  setIngredientsOptions,
  onIngredientRemove,
  fillIngredients,
  getIngredientUnitOptions,
} = useIngredients(recipeIngredients, getComponentInput);

onBeforeMount(async () => {
  isLoading.value = true;
  await fillIngredients();
  await setIngredientsOptions();
  await nextTick();
  isLoading.value = false;
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
