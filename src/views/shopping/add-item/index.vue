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
import { computed, nextTick, ref } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/composables/window-size";
import { IngredientUnitDetails } from "@/types/ingredients/ingredient";
import { useAddShoppingItem } from "./composables/item";
import { useAddShoppingItemOptions } from "./composables/options";
import { ShoppingItem } from "@/types/shopping/item";
import { useMobileAddShoppingItemPanel } from "./composables/mobile-panel";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps<{
  listId: number;
}>();

const emits = defineEmits<{
  (e: "itemAdded", item: Partial<ShoppingItem>): void;
}>();

const autocompleteKey = ref(0);
const amount = ref<number>();
const amountInput = ref<{ input: HTMLInputElement }>();
const ingredientAutocomplete = ref<{ input: HTMLInputElement }>();
const isSubmittingItem = computed(() => store.state.shopping.item.isSubmitting);
const isSubmittingCustomItem = computed(
  () => store.state.shopping.customItem.isSubmitting
);
const isSubmitting = computed(
  () => isSubmittingItem.value || isSubmittingCustomItem.value
);
const primaryUnit = computed<IngredientUnitDetails | undefined>(
  () => store.getters["ingredient/primaryUnit"]
);

const getAmountPlaceholder = () => {
  if (!primaryUnit.value) {
    return "Ilość";
  }
  return `Ilość (${primaryUnit.value.unitName})`;
};

const onSubmit = async () => {
  await addItem().then(async (item) => {
    clearInputValues();

    if (item) {
      emits("itemAdded", item);
    }

    await nextTick();
    ingredientAutocomplete.value?.input.focus();
  });
};

const clearInputValues = () => {
  selectedItem.value = undefined;
  amount.value = undefined;
  autocompleteKey.value++;
};

const { options } = useAddShoppingItemOptions();

const { selectedItem, onAddCustomItem, addItem, onItemSelect } =
  useAddShoppingItem(amount, primaryUnit, options, props.listId, amountInput);

const { isMobilePanelOpen, onMobileButtonClick } =
  useMobileAddShoppingItemPanel();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
