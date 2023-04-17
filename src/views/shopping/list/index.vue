<script lang="ts">
import CHorizontalTabs from "@/components/navigation/horizontal-tabs/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import ShoppingItems from "./items/default/index.vue";
import ShoppingItemsByRecipe from "./items/by-recipe/index.vue";
import ShoppingItemsByCategory from "./items/by-category/index.vue";
import CShoppingItem from "./item/index.vue";
import AddItem from "../add-item/index.vue";
import MoveShoppingItemModal from "./move-item-modal/index.vue";
import ShoppingListLoader from "./loader/index.vue";

export default {
  name: "ShoppingList",
  components: {
    CHorizontalTabs,
    CCard,
    CButton,
    CAutocomplete,
    ShoppingItems,
    ShoppingItemsByRecipe,
    ShoppingItemsByCategory,
    CShoppingItem,
    AddItem,
    MoveShoppingItemModal,
    ShoppingListLoader,
  },
};
</script>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  onBeforeMount,
  ref,
  provide,
  watch,
  WritableComputedRef,
} from "vue";
import { useStore } from "vuex";
import { ShoppingList } from "@/types/shopping/list";
import { ShoppingItem } from "@/types/shopping/item";
import { useShoppingHelpers } from "../composables/helpers";
import { useWindowSize } from "@/composables/window-size";
import { useShoppingListNavigationTabs } from "./composables/tabs";

const store = useStore();
const { isMobile } = useWindowSize();

const props = defineProps<{
  list: ShoppingList;
}>();

const emits = defineEmits<{
  (e: "editList", id: number): void;
}>();

const { sumUpItemsWithSameIngredient } = useShoppingHelpers();
const {
  selectedTab,
  tabs,
  isDefaultSelected,
  isByCategorySelected,
  isByRecipeSelected,
} = useShoppingListNavigationTabs();

const isSummedUpMode = ref(true);
const isClearingList = ref(false);
const isLoadingItems = computed(
  () => store.state.shopping.item.isLoadingCollection
);

const items: WritableComputedRef<ShoppingItem[]> = computed({
  get(): ShoppingItem[] {
    const items = store.state.shopping.item.collection;
    return items?.filter((item: ShoppingItem) => !item.isChecked);
  },
  set(value: ShoppingItem[]) {
    store.commit("shopping/item/setCollection", value);
  },
});

const ownedItems: ComputedRef<ShoppingItem[]> = computed(() => {
  const items = store.state.shopping.item.collection;
  const ownedItems = items?.filter((item: ShoppingItem) => item.isChecked);

  if (isSummedUpMode.value) {
    return sumUpItemsWithSameIngredient(ownedItems);
  }
  return ownedItems;
});

const addItemToList = (item: ShoppingItem) => {
  items.value = items.value.concat(item);
};

const clearList = async () => {
  isClearingList.value = true;
  await store.dispatch("shopping/list/removeItems", props.list.id);
  isClearingList.value = false;
};

const getSummedUpModeButtonLabel = () => {
  if (isMobile.value) {
    return "";
  }
  if (isSummedUpMode.value) {
    return "Rozłącz";
  }
  return "Połącz";
};

const loadShoppingItems = () => {
  store.dispatch("shopping/item/loadCollection", props.list.id);
};

watch(
  () => props.list.id,
  () => {
    loadShoppingItems();
  }
);

onBeforeMount(() => {
  loadShoppingItems();
  store.dispatch("recipe/loadOptions");
  store.dispatch("ingredient/category/loadOptions");
  store.dispatch("shopping/item/initWebSocket");
});

provide("isSummedUpMode", isSummedUpMode);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
