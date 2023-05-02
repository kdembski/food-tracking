<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CSelectTags from "@/components/controls/custom/select-tags/default/index.vue";

export default {
  name: "RecipeFields",
  components: {
    CButton,
    CInput,
    CAutocomplete,
    CSelectTags,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { Recipe } from "@/types/recipes/recipe";
import { useStoredErrors } from "@/composables/stored-errors";

const store = useStore();
const props = defineProps<{
  recipe: Recipe;
}>();

const recipesTags = ref();
const isLoadingRecipesTags = computed(
  () => store.getters["recipe/isLoadingTags"]
);

const { getErrorMessage, clearError, clearAllErrors } =
  useStoredErrors("recipe");

onBeforeMount(async () => {
  await store.dispatch("recipe/loadTags");
  recipesTags.value = store.getters["recipe/tags"];
});

onBeforeUnmount(() => {
  clearAllErrors();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
