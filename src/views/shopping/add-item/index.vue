<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CDraggableButton from "@/components/controls/draggable-button/index.vue";

export default {
  name: "ShoppingListAddItem",
  components: {
    CButton,
    CAutocomplete,
    CDraggableButton,
    CInput,
  },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/composables/window-size";
import { IngredientUnitDetails } from "@/types/ingredients/ingredient";
import { useShoppingAddItem } from "./composables/item";
import { useShoppingAddItemOptions } from "./composables/options";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps<{
  listId: number;
}>();

const emits = defineEmits<{
  (e: "success"): void;
}>();

const amount = ref<number>();
const primaryUnit = computed<IngredientUnitDetails | undefined>(
  () => store.getters["ingredient/primaryUnit"]
);
const isOpenOnMobile = ref(false);
const mobileButton = ref<{ button: HTMLButtonElement }>();

const getAmountPlaceholder = () => {
  if (!primaryUnit.value) {
    return "Ilość";
  }
  return `Ilość (${primaryUnit.value.unitName})`;
};

const onSubmit = () => {
  const item = buildItem();
  if (!item) {
    return;
  }

  addItem(item).then(() => {
    emits("success");
  });
};

const onClickAway = (e: any) => {
  if (!isOpenOnMobile.value) {
    return;
  }

  let target = e.target;
  while (target.parentElement) {
    if (target === mobileButton.value?.button) {
      return;
    }
    target = target.parentElement;
  }

  isOpenOnMobile.value = false;
};

const onMobileButtonClick = () => {
  isOpenOnMobile.value = !isOpenOnMobile.value;
};

const { selectedItem, buildItem, addItem, onItemSelect } = useShoppingAddItem(
  amount,
  primaryUnit,
  props.listId
);

const { options } = useShoppingAddItemOptions();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
