<script lang="ts">
import CTableWithFilters from "@/components/data-display/listings/table-with-filters/index.vue";
import CButton from "@/components/controls/buttons/button/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";

export default {
  name: "CustomizedTable",
  components: { CTableWithFilters, CButton, CModal },
};
</script>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { ListFilters } from "@/types/components/data-display/list";
import { TableColumn } from "@/types/components/data-display/table";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();

const props = defineProps<{
  listName: string;
  storeModuleName: string;
  defaultFilters: ListFilters<unknown>;
  columns: TableColumn[];
  deleteItem: (id?: number) => Promise<void>;
  isSubmittingItem: boolean;
  addButtonLabel: string;
}>();

const emits = defineEmits<{
  (e: "editItem"): void;
}>();

const table: Ref<{ handleListLoadingProccess: () => void } | undefined> = ref();
const editedItemId: Ref<number | undefined> = ref();

const onAddButtonClick = () => {
  editItem();
};

const editItem = (id?: number) => {
  editedItemId.value = id;
  emits("editItem");
};

const isDeleteModalOpen = ref(false);
const deletedItemId: Ref<number | undefined> = ref();
const deletedItemName: Ref<string | undefined> = ref();

const openDeleteModal = (item: { id: number; name: string }) => {
  isDeleteModalOpen.value = true;
  deletedItemId.value = item.id;
  deletedItemName.value = item.name;
};

const deleteItem = () => {
  props
    .deleteItem(deletedItemId.value)
    .then(() => table.value?.handleListLoadingProccess())
    .finally(() => {
      isDeleteModalOpen.value = false;
    });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
