<script lang="ts">
import CHorizontalTabs from "@/components/navigation/horizontal-tabs/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import ShoppingItems from "../items/default/index.vue";
import ShoppingItemsByRecipe from "../items/by-recipe/index.vue";
import ShoppingItemsByCategory from "../items/by-category/index.vue";
import CShoppingItem from "../item/index.vue";
import AddItem from "../add-item/index.vue";
import MoveShoppingItemModal from "../move-item-modal/index.vue";

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
  },
};
</script>

<script setup lang="ts">
import { ShoppingList, ShoppingListNavItems } from "@/types/shopping/list";
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
import { ShoppingItem } from "@/types/shopping/item";
import { useShoppingHelpers } from "../composables/helpers";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps<{
  list: ShoppingList;
}>();

const emits = defineEmits<{
  (e: "editList", id: number): void;
}>();

const isClearingList = computed(
  () => store.state.shopping.list.isDeletingItems
);
const tabs = [
  { code: ShoppingListNavItems.DEFAULT, label: "Bez podziału" },
  { code: ShoppingListNavItems.BY_RECIPE, label: "Według przepisów" },
  { code: ShoppingListNavItems.BY_CATEGORY, label: "Według kategorii" },
];
const selectedTab = ref(ShoppingListNavItems.DEFAULT);
const isSummedUpMode = ref(true);
provide("isSummedUpMode", isSummedUpMode);
const { sumUpItemsWithSameIngredient } = useShoppingHelpers();

const isDefaultSelected = () =>
  selectedTab.value === ShoppingListNavItems.DEFAULT;
const isByRecipeSelected = () =>
  selectedTab.value === ShoppingListNavItems.BY_RECIPE;
const isByCategorySelected = () =>
  selectedTab.value === ShoppingListNavItems.BY_CATEGORY;

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

const clearList = () => {
  store.dispatch("shopping/list/removeItems", props.list.id).then(() => {
    store.commit("shopping/item/setCollection", []);
  });
};

const loadShoppingItems = () => {
  store.dispatch("shopping/item/loadCollection", props.list.id);
};

const loadRecipeOptions = () => {
  store.dispatch("recipe/loadOptions");
};

const loadIngredientCategoryOptions = () => {
  store.dispatch("ingredient/category/loadOptions");
};

const initShoppingItemsWebSocket = () => {
  store.dispatch("shopping/item/initWebSocket");
};

onBeforeMount(() => {
  loadShoppingItems();
  loadRecipeOptions();
  loadIngredientCategoryOptions();
  initShoppingItemsWebSocket();
});

watch(
  () => props.list.id,
  () => {
    loadShoppingItems();
  }
);

const getSummedUpModeButtonLabel = () => {
  if (isMobile.value) {
    return "";
  }
  if (isSummedUpMode.value) {
    return "Rozłącz";
  }
  return "Połącz";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
