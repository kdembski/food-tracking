<script lang="ts">
import CShoppingItem from "../../item/index.vue";

export default {
  name: "ShoppingItemsByCategory",
  components: { CShoppingItem },
};
</script>

<script setup lang="ts">
import { computed, inject, Ref } from "vue";
import { useStore } from "vuex";
import { CategoryShoppingItems, ShoppingItem } from "@/types/shopping/item";
import { useShoppingHelpers } from "../../../composables/helpers";

const store = useStore();
const props = defineProps<{
  items?: ShoppingItem[];
}>();

const { sumUpItemsWithSameIngredient, isSummedUpItems, sortByIds } =
  useShoppingHelpers();
const isSummedUpMode = inject<Ref<boolean>>("isSummedUpMode");

const getIngredientCategoryName = (categoryId: number) => {
  return store.getters["ingredient/category/getNameById"](categoryId);
};

const itemsGroupedByCategoryId = computed(() => {
  const groupedItems = sortByIds(groupItemsByCategoryId(props.items));

  if (isSummedUpMode?.value) {
    return sumUpItemGroupedByCategoryId(groupedItems);
  }
  return groupedItems;
});

const sumUpItemGroupedByCategoryId = (
  groupedItems?: CategoryShoppingItems[]
) => {
  return groupedItems?.map((item) => {
    if (isSummedUpItems(item.items)) {
      return item;
    }

    item.items = sumUpItemsWithSameIngredient(item.items) || [];
    return item;
  });
};

const groupItemsByCategoryId = (items?: ShoppingItem[]) => {
  return items?.reduce((accum: CategoryShoppingItems[], item) => {
    const categoryItem = accum.find(
      (categoryItem: CategoryShoppingItems) =>
        categoryItem.categoryId === item.ingredientCategoryId
    );

    if (isSummedUpItems(categoryItem?.items)) {
      return accum;
    }

    if (categoryItem) {
      categoryItem.items.push(item);
      return accum;
    }

    accum.push({ categoryId: item.ingredientCategoryId, items: [item] });
    return accum;
  }, []);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
