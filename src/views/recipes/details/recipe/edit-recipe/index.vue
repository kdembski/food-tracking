<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import RecipeFields from "../../../fields/recipe/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "EditRecipe",
  components: {
    CButton,
    RecipeFields,
    CLoader,
  },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/composables/window-size";
import { Recipe } from "@/types/recipes/recipe";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps<{
  recipe: Recipe;
}>();

const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "success"): void;
}>();

const isUpdatingRecipe = computed(() => store.state.recipe.isSubmitting);

const updateRecipe = async () => {
  await store.dispatch("recipe/update", props.recipe);
  emits("success");
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
