<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CSetPortions from "@/components/controls/custom/set-portions/index.vue";
import SelectShoppingList from "../select-list/index.vue";

export default {
  name: "AddRecipeToShoppingListModal",
  components: {
    CInput,
    CModal,
    CButton,
    CSetPortions,
    SelectShoppingList,
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useToastNotification } from "@/composables/toast-notification";

const toastNotification = useToastNotification();
const store = useStore();

const isSubmitting = computed(() => store.state.recipe.isAddingToShoppingList);
const selectedListId = ref<number>();
const portions = ref(4);
const addedRecipeId = computed(() => store.state.shopping.addedRecipeId);
const addedRecipe = computed(() => store.state.recipe.single);
const isLoadingRecipe = computed(() => store.state.recipe.isLoading);

const isOpen = computed({
  get(): boolean {
    return store.state.shopping.isAddRecipeModalOpen;
  },
  set(value: boolean) {
    store.commit("shopping/setIsAddRecipeModalOpen", value);
  },
});

watch(isOpen, (value) => {
  if (!value) {
    return;
  }
  store.dispatch("recipe/load", addedRecipeId.value);
});

const closeModal = () => {
  isOpen.value = false;
};

const onSubmit = () => {
  store
    .dispatch("recipe/addToShoppingList", {
      shoppingListId: selectedListId.value,
      recipeId: addedRecipe.value.id,
      portions: portions.value,
    })
    .then(() => {
      closeModal();
    });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
