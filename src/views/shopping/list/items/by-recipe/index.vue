<script lang="ts">
import CShoppingItem from "../../item/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "ShoppingItemsByRecipe",
  components: { CShoppingItem, CButton },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { RecipeShoppingItems, ShoppingItem } from "@/types/shopping/item";
import { useShoppingHelpers } from "../../../composables/helpers";

const store = useStore();
const props = defineProps<{
  items?: ShoppingItem[];
}>();

const { sortByIds } = useShoppingHelpers();

const isDeletingRecipe = ref<Record<number, boolean>>({});

const itemsGroupedByRecipeId = computed(() => {
  return sortByIds(groupItemsByRecipeId(props.items));
});

const getRecipeName = (recipeId: number) => {
  return store.getters["recipe/getNameById"](recipeId);
};

const groupItemsByRecipeId = (items?: ShoppingItem[]) => {
  return items?.reduce((accum: RecipeShoppingItems[], item) => {
    const recipeItem = accum.find(
      (categoryItem: RecipeShoppingItems) =>
        categoryItem.recipeId === item.recipeId
    );

    if (recipeItem) {
      recipeItem.items.push(item);
      return accum;
    }

    accum.push({ recipeId: item.recipeId, items: [item] });
    return accum;
  }, []);
};

const deleteRecipe = async (id: number) => {
  isDeletingRecipe.value[id] = true;
  await store.dispatch("shopping/item/deleteByRecipeId", id);
  isDeletingRecipe.value[id] = false;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
