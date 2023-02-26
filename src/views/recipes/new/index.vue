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
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isCreatingRecipe = computed(() => store.state.recipe.isSubmitting);
const newRecipe = reactive({
  recipeName: "",
  preparationTime: "",
  tags: "",
  cookidooLink: "",
});

const createRecipe = async () => {
  await store.dispatch("recipe/create", newRecipe);
  router.push("/recipes");
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
