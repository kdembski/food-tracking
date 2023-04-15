<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import CButton from "@/components/controls/button/index.vue";
import SelectShoppingList from "../../select-list/index.vue";

export default {
  name: "MoveShoppingItemModal",
  components: {
    CInput,
    CModal,
    CButton,
    SelectShoppingList,
  },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { ShoppingItem, SummedUpShoppingItem } from "@/types/shopping/item";
import { useToastNotification } from "@/composables/toast-notification";
import { useShoppingHelpers } from "../../composables/helpers";
import { ShoppingList } from "@/types/shopping/list";

const { isSummedUpItem } = useShoppingHelpers();
const toastNotification = useToastNotification();
const store = useStore();

const isSubmitting = ref(false);
const selectedListId = ref<number>();
const selectedList = computed<ShoppingList>(() =>
  store.getters["shopping/list/getById"](selectedListId.value)
);
const currentList = computed<ShoppingList>(() => {
  const currentListId = store.state.shopping.item.shoppingListId;
  return store.getters["shopping/list/getById"](currentListId);
});

const itemToMove = computed({
  get(): ShoppingItem | SummedUpShoppingItem | undefined {
    return store.state.shopping.item.itemToMove;
  },
  set(item: ShoppingItem | SummedUpShoppingItem | undefined) {
    store.commit("shopping/item/setItemToMove", item);
  },
});

const isOpen = computed({
  get(): boolean {
    return !!itemToMove.value;
  },
  set(value: boolean) {
    if (value) {
      return;
    }
    closeModal();
  },
});

const closeModal = () => {
  itemToMove.value = undefined;
};

const onSubmit = () => {
  const item = itemToMove.value;
  if (!item) {
    return;
  }

  isSubmitting.value = true;
  if (isSummedUpItem(item)) {
    updateSummedUpItem(item);
    return;
  }

  updateItem(item);
};

const updateItem = (item: ShoppingItem) => {
  item.shoppingListId = selectedList.value.id;
  store
    .dispatch("shopping/item/update", item)
    .then(() => {
      updateListsCount([item]);
      onSuccess();
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};

const updateSummedUpItem = (summedUpItem: SummedUpShoppingItem) => {
  const promises = summedUpItem.items.map((item) => {
    item.shoppingListId = selectedList.value.id;
    return store.dispatch("shopping/item/update", item);
  });

  Promise.all(promises)
    .then(() => {
      updateListsCount(summedUpItem.items);
      onSuccess();
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};

const updateListsCount = (itemsToRemove: ShoppingItem[]) => {
  const countDifference = itemsToRemove.length;
  selectedList.value.count += countDifference;
  currentList.value.count -= countDifference;
};

const onSuccess = () => {
  store.dispatch("shopping/item/sendWebSocketMessage");
  showSuccessMessage();
  closeModal();
};

const showSuccessMessage = () => {
  toastNotification.success(
    'Przeniesiono przedmiot do listy: "' + selectedList.value.name + '"'
  );
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
