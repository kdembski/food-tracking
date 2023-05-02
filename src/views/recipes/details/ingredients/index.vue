<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import CSetPortions from "@/components/controls/custom/set-portions/index.vue";
import RecipeIngredientsFields from "../../fields/ingredients/index.vue";
import RecipeIngredientsLoader from "./loader/index.vue";
import { RecipeIngredient } from "@/types/recipes/recipeIngredient";

export default {
  name: "RecipeDetailsIngredients",
  components: {
    CButton,
    CLoader,
    CSetPortions,
    RecipeIngredientsFields,
    RecipeIngredientsLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { cloneDeep } from "lodash";

const store = useStore();
const route = useRoute();

const emits = defineEmits<{
  (e: "success"): void;
}>();

const isLoadingIngredients = computed(
  () => store.state.recipe.ingredient.isLoadingCollection
);
const isUpdatingIngredients = computed(
  () => store.state.recipe.ingredient.isSubmittingCollection
);
const recipeId = computed(() => route.params.id);
const tempIngredients: Ref<RecipeIngredient[] | undefined> = ref();
const portions = ref(4);
const isEditing = ref(false);
const ingredients = computed({
  get(): RecipeIngredient[] {
    return store.state.recipe.ingredient.collection;
  },
  set(value: RecipeIngredient[]) {
    store.commit("recipe/ingredient/setCollection", value);
  },
});

onBeforeMount(() => {
  loadIngredients();
});

const loadIngredients = () => {
  return store.dispatch("recipe/ingredient/loadCollection", recipeId.value);
};

const updateIngredients = async () => {
  await store.dispatch("recipe/ingredient/updateCollection", {
    collection: getIngredientsWithoutEmpties(),
    recipeId: recipeId.value,
  });
  isEditing.value = false;
  emits("success");
  await loadIngredients();
};

const getIngredientsWithoutEmpties = () => {
  return ingredients.value.filter((ingredient) => {
    return !(
      !ingredient.ingredientId &&
      !ingredient.unitId &&
      !ingredient.amount
    );
  });
};

const startEditing = () => {
  isEditing.value = true;
  tempIngredients.value = cloneDeep(ingredients.value);
};

const cancelEditing = () => {
  isEditing.value = false;

  if (!tempIngredients.value) {
    return;
  }
  ingredients.value = cloneDeep(tempIngredients.value);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
