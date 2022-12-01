<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import { useRouter } from "vue-router";

export default {
  name: "NewRecipeView",
  components: {
    CButton,
    CInput,
    CAutocomplete,
    CSelectTags,
    CLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isLoadingRecipesTags = computed(
  () => store.getters["recipe/isLoadingRecipesTags"]
);

const isCreatingRecipe = computed(() => store.state.recipe.isSubmittingRecipe);

const recipesTags = ref();
const newRecipe = reactive({
  recipeName: "",
  preparationTime: "",
  tags: "",
  cookidooLink: "",
});

onBeforeMount(async () => {
  await store.dispatch("recipe/loadRecipesTags");
  recipesTags.value = store.getters["recipe/recipesTags"];
});

const createRecipe = async () => {
  await store.dispatch("recipe/createRecipe", newRecipe);
  router.push("/recipes");
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
