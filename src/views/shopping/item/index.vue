<script lang="ts">
import CCheckbox from "@/components/controls/checkbox/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "ShoppingItem",
  components: { CCheckbox, CButton },
};
</script>

<script setup lang="ts">
import { computed, inject, ref, Ref } from "vue";
import { useShoppingHelpers } from "../composables/helpers";
import { ShoppingItem, SummedUpShoppingItem } from "@/types/shopping/item";
import { useWindowSize } from "@/composables/window-size";
import { useStore } from "vuex";

const store = useStore();

const props = withDefaults(
  defineProps<{
    item: ShoppingItem | SummedUpShoppingItem;
    disableActions?: boolean;
    grayedOut?: boolean;
  }>(),
  { disableActions: false, grayedOut: false }
);

const { isSummedUpItem } = useShoppingHelpers();
const { isMobile } = useWindowSize();
const isSummedUpMode = inject<Ref<boolean>>("isSummedUpMode");
const isDeletingItem = ref(false);

const getItemName = (item: ShoppingItem | SummedUpShoppingItem) => {
  return item.ingredientName || item.customItemName;
};

const getItemKey = (item: ShoppingItem | SummedUpShoppingItem) => {
  return item.id || item.ingredientId;
};

const isCustomItem = () => {
  return !!props.item.customItemName;
};

const handleChecking = async (value: boolean) => {
  if (!isSummedUpItem(props.item)) {
    store.dispatch("shopping/item/updateIsChecked", props.item);
    return;
  }

  props.item.items.forEach((item) => {
    item.isChecked = value;
    store.dispatch("shopping/item/updateIsChecked", item);
  });
};

const handleDeleting = async () => {
  isDeletingItem.value = true;

  if (!isSummedUpItem(props.item)) {
    await deleteItem(props.item);
    isDeletingItem.value = false;
    return;
  }

  await deleteSummedUpItem(props.item);
  isDeletingItem.value = false;
};

const deleteItem = (item: ShoppingItem) => {
  if (item.isChecked) {
    return store.dispatch("shopping/item/updateIsRemoved", item);
  }

  return store.dispatch("shopping/item/delete", item.id);
};

const deleteSummedUpItem = async (item: SummedUpShoppingItem) => {
  const promises = item.items.map((item) => {
    return deleteItem(item);
  });
  await Promise.all(promises);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
