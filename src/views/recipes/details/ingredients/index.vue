<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/custom/select-tags/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "RecipeDetailsIngredients",
  components: {
    CButton,
    CInput,
    CSelectTags,
    CLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const isLoadingIngredients = computed(
  () => store.state.recipe.ingredient.isLoadingCollection
);
const isUpdatingIngredients = computed(
  () => store.state.recipe.ingredient.isSubmittingCollection
);
const recipeId = computed(() => route.params.id);
const ingredients = computed(() => store.state.recipe.ingredient.collection);

onBeforeMount(() => {
  loadIngredients();
});

const loadIngredients = () => {
  return store.dispatch("recipe/ingredient/loadCollection", recipeId.value);
};

const updateIngredients = async () => {
  await store.dispatch("recipe/ingredient/updateCollection", {
    collection: ingredients,
    recipeId: recipeId.value,
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
