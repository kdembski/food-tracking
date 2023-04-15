<script lang="ts">
import CShoppingItem from "../../item/index.vue";
import Draggable from "vuedraggable";

export default {
  name: "ShoppingItems",
  components: { CShoppingItem, Draggable },
};
</script>

<script setup lang="ts">
import { computed, inject, Ref } from "vue";
import { useStore } from "vuex";
import { ShoppingItem } from "@/types/shopping/item";
import { useShoppingHelpers } from "../../composables/helpers";

const store = useStore();
const props = defineProps<{
  items?: ShoppingItem[];
}>();

const { sumUpItemsWithSameIngredient } = useShoppingHelpers();

const isSummedUpMode = inject<Ref<boolean>>("isSummedUpMode");

const items = computed(() => {
  if (isSummedUpMode?.value) {
    return sumUpItemsWithSameIngredient(props.items);
  }
  return props.items;
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
