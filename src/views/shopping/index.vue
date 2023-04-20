<script lang="ts">
import CShoppingList from "./list/index.vue";
import SideNav from "./side-nav/index.vue";
import EditListModal from "./list/edit-modal/index.vue";
import ShoppingLoader from "./loader/index.vue";

export default {
  name: "ShoppingView",
  components: { CShoppingList, SideNav, EditListModal, ShoppingLoader },
};
</script>

<script setup lang="ts">
import { ShoppingList } from "@/types/shopping/list";
import { computed, ComputedRef, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const shoppingLists: ComputedRef<ShoppingList[] | null> = computed(
  () => store.state.shopping.list.all
);
const isLoadingShoppingLists = computed(
  () => store.state.shopping.list.isLoadingAll
);

const activeListId = ref<number>();
const editedListId = ref<number>();
const isEditListModalOpen = ref(false);

const activeList = computed(() =>
  shoppingLists.value?.find((list) => list.id === activeListId.value)
);

const editList = (id?: number) => {
  editedListId.value = id;
  isEditListModalOpen.value = true;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
