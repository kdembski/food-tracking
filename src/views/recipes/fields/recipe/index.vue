<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CSelectTags from "@/components/controls/custom/select-tags/index.vue";

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
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { Recipe } from "@/types/recipes/recipe";

const store = useStore();
const props = defineProps<{
  recipe: Recipe;
}>();

const isLoadingRecipesTags = computed(
  () => store.getters["recipe/isLoadingTags"]
);

const recipesTags = ref();
onBeforeMount(async () => {
  await store.dispatch("recipe/loadTags");
  recipesTags.value = store.getters["recipe/tags"];
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
