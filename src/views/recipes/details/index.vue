<script lang="ts">
import Recipe from "./recipe/index.vue";
import RecipeIngredients from "./ingredients/index.vue";

export default {
  name: "RecipeDetailsView",
  components: { Recipe, RecipeIngredients },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
