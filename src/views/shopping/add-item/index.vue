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
import { IngredientUnitDetails } from "@/types/ingredients/ingredient";
import { useAddShoppingItem } from "./composables/item";
import { useAddShoppingItemOptions } from "./composables/options";
import { useMobileAddShoppingItemPanel } from "./composables/mobile-panel";

const store = useStore();

const props = defineProps<{
  listId: number;
}>();

const amount = ref<number>();
const isSubmitting = ref(false);

const autocompleteKey = ref(0);
const amountInput = ref<{ input: HTMLInputElement }>();
const ingredientAutocomplete = ref<{ input: HTMLInputElement }>();

const primaryUnit = computed<IngredientUnitDetails | undefined>(
  () => store.getters["ingredient/primaryUnit"]
);

const getAmountPlaceholder = () => {
  if (!primaryUnit.value) {
    return "Ilość";
  }
  return `Ilość (${primaryUnit.value.unitName})`;
};

const onSubmit = () => {
  isSubmitting.value = true;
  addItem()
    .then(async () => {
      clearInputValues();

      await nextTick();
      ingredientAutocomplete.value?.input.focus();
    })
    .finally(() => {
      isSubmitting.value = false;
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
