<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import RecipeFields from "../fields/recipe/index.vue";

export default {
  name: "NewRecipeView",
  components: {
    CButton,
    CLoader,
    RecipeFields,
  },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const newRecipe = ref({});
const isCreatingRecipe = computed(() => store.state.recipe.isSubmitting);

const onSubmit = async () => {
  const recipeId: number = await createRecipe();
  router.push("/recipes/" + recipeId);
};

const createRecipe = () => {
  return store.dispatch("recipe/create", newRecipe.value);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
