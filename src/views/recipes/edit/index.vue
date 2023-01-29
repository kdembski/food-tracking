<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/custom/select-tags/index.vue";
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

const isLoadingRecipe = computed(() => store.state.recipe.isLoading);
const isUpdatingRecipe = computed(() => store.state.recipe.isSubmitting);
const isLoadingRecipesTags = computed(() => store.state.recipe.isLoadingTags);
const recipeId = computed(() => route.params.id);
const recipe = computed(() => store.state.recipe.single);
const recipesTags = ref();

onBeforeMount(() => {
  loadRecipe();
  setRecipesTags();
});

const loadRecipe = () => {
  return store.dispatch("recipe/load", recipeId.value);
};

const setRecipesTags = async () => {
  await store.dispatch("recipe/loadTags");
  recipesTags.value = store.getters["recipe/tags"];
};

const updateRecipe = async () => {
  await store.dispatch("recipe/update", recipe.value);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
