<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "EditRecipeView",
  components: {
    CButton,
    CInput,
    CSelectTags,
    CLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const isLoadingRecipe = computed(() => store.state.recipe.isLoadingRecipe);
const isUpdatingRecipe = computed(() => store.state.recipe.isSubmittingRecipe);
const isLoadingRecipesTags = computed(
  () => store.state.recipe.isLoadingRecipesTags
);
const recipeId = computed(() => route.params.id);
const recipe = computed(() => store.state.recipe.recipe);
const recipesTags = ref();

onBeforeMount(() => {
  loadRecipe();
  setRecipesTags();
});

const loadRecipe = () => {
  return store.dispatch("recipe/loadRecipe", recipeId.value);
};

const setRecipesTags = async () => {
  await store.dispatch("recipe/loadRecipesTags");
  recipesTags.value = store.getters["recipe/getRecipesTags"];
};

const updateRecipe = async () => {
  await store.dispatch("recipe/updateRecipe", recipe.value);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
