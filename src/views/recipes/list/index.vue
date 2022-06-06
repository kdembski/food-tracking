<script lang="ts">
import CTable from "@/components/data-display/table/index.vue";

export default {
  name: "RecipesListView",
  components: { CTable },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";
const store = useStore();

const filters = ref({
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "",
  sortDirection: "",
});

const recipesList = computed(() => store.getters["recipe/getRecipesList"]);
const isLoadingRecipesList = computed(
  () => store.state.recipe.isLoadingRecipesList
);
const recipesListColumns = [
  {
    label: "Nazwa przepisu",
    value: "recipeName",
  },
  {
    label: "Tagi",
    value: "tags",
  },
];

onMounted(() => {
  store.dispatch("recipe/getRecipesList", filters);
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
