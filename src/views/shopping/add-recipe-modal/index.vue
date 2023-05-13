<script lang="ts">
import CInput from "@/components/controls/inputs/input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import CButton from "@/components/controls/buttons/button/index.vue";
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
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isSubmitting = computed(() => store.state.recipe.isAddingToShoppingList);
const selectedListId = ref<number>();
const portions = ref(4);
const addedRecipeId = computed(() => store.state.shopping.addedRecipeId);

const isOpen = computed({
  get(): boolean {
    return store.state.shopping.isAddRecipeModalOpen;
  },
  set(value: boolean) {
    store.commit("shopping/setIsAddRecipeModalOpen", value);
  },
});

const closeModal = () => {
  isOpen.value = false;
};

const getRecipeName = () => {
  return store.getters["recipe/getNameById"](addedRecipeId.value);
};

const onSubmit = () => {
  store
    .dispatch("recipe/addToShoppingList", {
      shoppingListId: selectedListId.value,
      recipeId: addedRecipeId.value,
      portions: portions.value,
    })
    .then(() => {
      closeModal();
    });
};

onBeforeMount(() => {
  store.dispatch("recipe/loadOptions");
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
