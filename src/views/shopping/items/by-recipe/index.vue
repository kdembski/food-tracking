<script lang="ts">
import CShoppingItem from "../../item/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "ShoppingItemsByRecipe",
  components: { CShoppingItem, CButton },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { RecipeShoppingItems, ShoppingItem } from "@/types/shopping/item";

const store = useStore();
const props = defineProps<{
  items?: ShoppingItem[];
}>();

const itemsGroupedByRecipeId = computed(() => {
  return groupItemsByRecipeId(props.items);
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
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
