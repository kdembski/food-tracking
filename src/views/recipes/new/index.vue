<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import RecipeFields from "../fields/recipe/index.vue";
import RecipeIngredientsFields from "../fields/ingredients/index.vue";
import { RecipeIngredient } from "@/types/recipes/recipeIngredient";

export default {
  name: "NewRecipeView",
  components: {
    CButton,
    CLoader,
    RecipeFields,
    RecipeIngredientsFields,
  },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const newRecipe = ref({
  recipeName: "",
  preparationTime: "",
  tags: "",
  cookidooLink: "",
});
const newIngredients = ref<Partial<RecipeIngredient>[]>([{}]);

const isCreatingRecipe = computed(() => store.state.recipe.isSubmitting);
const isCreatingngredients = computed(
  () => store.state.recipe.ingredient.isSubmittingCollection
);

const onSubmit = async () => {
  const recipeId: number = await createRecipe();
  await createIngredients(recipeId);
  router.push("/recipes");
};

const createRecipe = () => {
  return store.dispatch("recipe/create", newRecipe.value);
};

const createIngredients = (recipeId: number) => {
  return store.dispatch("recipe/ingredient/updateCollection", {
    collection: newIngredients.value,
    recipeId,
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
