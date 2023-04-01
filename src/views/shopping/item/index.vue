<script lang="ts">
import CCheckbox from "@/components/controls/checkbox/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "ShoppingItem",
  components: { CCheckbox, CButton },
};
</script>

<script setup lang="ts">
import { inject, Ref } from "vue";
import { useShoppingHelpers } from "../composables/helpers";
import { ShoppingItem, SummedUpShoppingItem } from "@/types/shopping/item";
import { useWindowSize } from "@/composables/window-size";

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

const getItemName = (item: ShoppingItem | SummedUpShoppingItem) => {
  return item.ingredientName || item.customItemName;
};

const getItemKey = (item: ShoppingItem | SummedUpShoppingItem) => {
  if (isSummedUpItem(item)) {
    return item.ingredientUnitId;
  }

  return item.id || item.customItemId;
};

const isCustomItem = () => {
  return !!props.item.customItemName;
};

const handleCheckingSummedItem = (value: boolean) => {
  if (!isSummedUpItem(props.item)) {
    return;
  }

  props.item.items.forEach((item) => (item.isChecked = value));
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
