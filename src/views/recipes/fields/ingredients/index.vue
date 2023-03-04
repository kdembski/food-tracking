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
import { useStore } from "vuex";
import {
  Ingredient,
  IngredientUnitDetails,
} from "@/types/ingredients/ingredient";
import { MultiInputValuesTypes } from "@/types/components/multi-input";

const store = useStore();
const props = defineProps<{
  modelValue: Partial<IngredientUnitDetails>[];
}>();
const emits = defineEmits<{
  (e: "update:modelValue", value: Partial<IngredientUnitDetails>[]): void;
}>();

const recipeIngredients = computed({
  get(): Partial<IngredientUnitDetails>[] {
    return props.modelValue;
  },
  set(value: Partial<IngredientUnitDetails>[]) {
    emits("update:modelValue", value);
  },
});

const isLoading = ref(false);
const ingredients = ref<Record<number, Ingredient>>({});
const unitInputs = ref<{ inputValue: string }[]>([]);
const isLoadingUnits = ref<Record<number, boolean>>({});
const isLoadingIngredients = ref(false);

const setIngredient = async (id: number, index: number) => {
  if (!id) {
    return;
  }

  isLoadingUnits.value[index] = true;
  await store.dispatch("ingredient/load", id);
  const ingredient = store.state.ingredient.single;
  ingredients.value[index] = ingredient;
  const units = ingredient.units;

  if (units.length === 1) {
    recipeIngredients.value[index].unitId = units[0].unitId;
    isLoadingUnits.value[index] = false;
    return;
  }

  recipeIngredients.value[index].unitId = undefined;
  unitInputs.value[index].inputValue = "";
  isLoadingUnits.value[index] = false;
};

const getIngredientUnitOptions = (index: number) => {
  if (!ingredients.value[index]) {
    return [];
  }

  const units = ingredients.value[index].units;
  return units.map((unit) => {
    return {
      value: unit.unitId,
      label: unit.unitName,
    };
  });
};

const fillIngredients = async () => {
  isLoadingIngredients.value = true;
  let temp = recipeIngredients.value.map((item) => {
    if (!item.ingredientId) {
      return;
    }
    return store.dispatch("ingredient/load", item.ingredientId);
  });

  ingredients.value = {};
  await Promise.all(temp)
    .then((items) => {
      items.forEach((item, index) => {
        ingredients.value[index] = item;
      });
    })
    .finally(() => {
      isLoadingIngredients.value = false;
    });
};

const ingredientsOptions = ref([]);
const setIngredientsOptions = async () => {
  await store.dispatch("ingredient/loadOptions");
  ingredientsOptions.value = store.getters["ingredient/options"];
};

const onIngredientRemove = async () => {
  await nextTick();
  fillIngredients();
};

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
