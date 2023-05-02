<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "EditShoppingListModal",
  components: {
    CInput,
    CModal,
    CButton,
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cloneDeep } from "lodash";
import { useStore } from "vuex";
import { ShoppingList } from "@/types/shopping/list";
import { useStoredErrors } from "@/composables/stored-errors";

const store = useStore();
const { getErrorMessage, clearError, clearAllErrors } =
  useStoredErrors("shopping/list");

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  listId: {
    type: Number,
    default: null,
  },
});

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
  (event: "success"): void;
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    emits("update:isOpen", value);
  },
});

watch(_isOpen, (value) => {
  list.value = cloneDeep(emptyList);
  if (!value) {
    clearAllErrors();
    return;
  }

  if (!isAddingNewList.value) {
    setList();
  }
});

const emptyList: Partial<ShoppingList> = {
  name: "",
};

const list = ref(cloneDeep(emptyList));
const isAddingNewList = computed(() => !props.listId);
const isLoading = computed(() => store.state.shopping.list.isLoading);
const isSubmitting = computed(() => store.state.shopping.list.isSubmitting);

const setList = async () => {
  await store.dispatch("shopping/list/load", props.listId);
  list.value = store.state.shopping.list.single;
};

const updateList = () => {
  return store.dispatch("shopping/list/update", list.value);
};

const createList = () => {
  return store.dispatch("shopping/list/create", list.value);
};

const deleteList = () => {
  if (isMainList()) {
    return;
  }

  return store.dispatch("shopping/list/delete", props.listId).then(() => {
    emits("success");
    closeModal();
  });
};

const isMainList = () => props.listId === 1;

const closeModal = () => {
  _isOpen.value = false;
};

const submit = async () => {
  if (isAddingNewList.value) {
    await createList();
    emits("success");
    closeModal();
    return;
  }

  await updateList();
  emits("success");
  closeModal();
};

const getTitle = () => {
  if (isAddingNewList.value) {
    return "Dodaj listę";
  }
  return "Edytuj listę";
};

const getSubmitButtonLabel = () => {
  if (isAddingNewList.value) {
    return "Dodaj";
  }
  return "Zapisz";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
