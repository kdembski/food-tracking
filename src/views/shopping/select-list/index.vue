<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import SelectShoppingListLoader from "./loader/index.vue";

export default {
  name: "SelectShoppingList",
  components: { CButton, SelectShoppingListLoader },
};
</script>

<script setup lang="ts">
import { ComputedRef, computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { ShoppingList } from "@/types/shopping/list";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();
const store = useStore();

const props = withDefaults(
  defineProps<{
    activeListId?: number;
    disableActions?: boolean;
    columns?: number;
    excludedListIds?: number[];
  }>(),
  { columns: 1 }
);

const emits = defineEmits<{
  (e: "update:activeListId", id: number | undefined): void;
  (e: "editList", id: number): void;
}>();

const isClearingList = ref<Record<number, boolean>>({});

const activeListId = computed({
  get(): number | undefined {
    return props.activeListId;
  },
  set(value?: number) {
    emits("update:activeListId", value);
  },
});

const isListActive = (id: number) => props.activeListId === id;
const isLoadingLists = computed(() => store.state.shopping.list.isLoadingAll);
const lists: ComputedRef<ShoppingList[] | undefined> = computed(() => {
  const all: ShoppingList[] | null = store.state.shopping.list.all;
  return all?.filter((list) => !props.excludedListIds?.includes(list.id));
});

const clearList = async (id: number) => {
  isClearingList.value[id] = true;
  await store.dispatch("shopping/list/removeItems", id);
  isClearingList.value[id] = false;
};
const loadShoppingLists = () => {
  return store.dispatch("shopping/list/loadAll");
};

onBeforeMount(async () => {
  await loadShoppingLists();

  const firstListId = lists.value?.[0].id;
  if (!firstListId) {
    return;
  }
  activeListId.value = firstListId;
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
