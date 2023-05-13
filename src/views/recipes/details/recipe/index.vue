<script lang="ts">
import InlineSvg from "vue-inline-svg";
import CButton from "@/components/controls/buttons/button/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import RecipeLoader from "./loader/index.vue";
import EditRecipe from "./edit-recipe/index.vue";

export default {
  name: "RecipeDetails",
  components: {
    InlineSvg,
    CButton,
    CDisplayTags,
    CCard,
    CModal,
    RecipeLoader,
    EditRecipe,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useRecipeHelpers } from "@/views/recipes/composables/helpers";
import { useWindowSize } from "@/composables/window-size";
import { Recipe } from "@/types/recipes/recipe";
import { clone } from "lodash";

const {
  isPlanned,
  getFormattedCookedDate,
  getPreparationTime,
  getKcal,
  openCookidooLink,
} = useRecipeHelpers();
const { isMobile } = useWindowSize();
const store = useStore();
const route = useRoute();
const router = useRouter();

const isLoadingRecipe = computed(() => store.state.recipe.isLoading);
const isDeletingRecipe = computed(() => store.state.recipe.isDeleting);
const recipeId = computed(() => route.params.id);
const tempRecipe: Ref<Recipe | undefined> = ref();
const isEditing = ref(false);
const isDeleteModalOpen = ref(false);

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

const openAddToCalendarModal = () => {
  store.commit("calendar/setAddedRecipe", recipe.value);
  store.commit("calendar/setIsAddToCalendarModalOpen", true);
};

const openAddToShoppingListModal = () => {
  store.commit("shopping/setAddedRecipeId", recipe.value.id);
  store.commit("shopping/setIsAddRecipeModalOpen", true);
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

const deleteRecipe = async () => {
  store.dispatch("recipe/delete", recipe.value.id).then(() => {
    router.push("/recipes");
  });
};

defineExpose({
  loadRecipe,
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
