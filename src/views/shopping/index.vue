<script lang="ts">
import CShoppingList from "./list/index.vue";
import SideNav from "./side-nav/index.vue";

export default {
  name: "ShoppingView",
  components: { CShoppingList, SideNav },
};
</script>

<script setup lang="ts">
import { ShoppingList } from "@/types/shopping/list";
import { computed, ComputedRef, onBeforeMount, ref, nextTick } from "vue";
import { useStore } from "vuex";

const store = useStore();
const shoppingLists: ComputedRef<ShoppingList[] | null> = computed(
  () => store.state.shopping.list.all
);
const isLoadingShoppingLists = computed(
  () => store.state.shopping.list.isLoading
);

const loadShoppingLists = () => {
  return store.dispatch("shopping/list/loadAll");
};

onBeforeMount(async () => {
  await loadShoppingLists();
  acitveListId.value = shoppingLists.value?.[0].id;
});

const acitveListId = ref<number>();

const activeList = computed(() =>
  shoppingLists.value?.find((list) => list.id === acitveListId.value)
);

const listsWithoutActive = computed(() =>
  shoppingLists.value?.filter((list) => list.id !== acitveListId.value)
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
