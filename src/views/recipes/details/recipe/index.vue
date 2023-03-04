<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import RecipeLoader from "./loader/index.vue";
import InlineSvg from "vue-inline-svg";
import RecipeFields from "../../fields/recipe/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import CCard from "@/components/surfaces/card/index.vue";

export default {
  name: "RecipeDetails",
  components: {
    CButton,
    CDisplayTags,
    RecipeLoader,
    InlineSvg,
    RecipeFields,
    CLoader,
    CCard,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRecipeHelpers } from "@/views/recipes/composables/helpers";
import { useWindowSize } from "@/composables/window-size";
import { Recipe } from "@/types/recipes/recipe";
import { clone } from "lodash";

const { isPlanned, getFormattedCookedDate, getPreparationTime } =
  useRecipeHelpers();
const { isMobile } = useWindowSize();
const store = useStore();
const route = useRoute();

const isLoadingRecipe = computed(() => store.state.recipe.isLoading);
const isUpdatingRecipe = computed(() => store.state.recipe.isSubmitting);
const recipeId = computed(() => route.params.id);
const tempRecipe: Ref<Recipe | undefined> = ref();
const isEditing = ref(false);
const recipe = computed({
  get(): Recipe {
    return store.state.recipe.single;
  },
  set(value: Recipe) {
    store.commit("recipe/setSingle", value);
  },
});

onBeforeMount(() => {
  loadRecipe();
});

const loadRecipe = () => {
  return store.dispatch("recipe/load", recipeId.value);
};

const updateRecipe = async () => {
  await store.dispatch("recipe/update", recipe.value);
  isEditing.value = false;
};

const openCookidooLink = () => {
  window.open(recipe.value.cookidooLink, "_blank");
};

const startEditing = () => {
  isEditing.value = true;
  tempRecipe.value = clone(recipe.value);
};

const cancelEditing = () => {
  isEditing.value = false;

  if (!tempRecipe.value) {
    return;
  }
  recipe.value = clone(tempRecipe.value);
};

defineExpose({
  loadRecipe,
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
