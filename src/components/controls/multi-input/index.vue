<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import MultiInputLoader from "./loader/index.vue";

export default {
  name: "CMultiInput",
  components: { CButton, CSkeletonLoader, MultiInputLoader },
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { MultiInputValuesTypes } from "@/types/components/multi-input";

const props = withDefaults(
  defineProps<{
    modelValue: unknown[];
    label?: string;
    type?: MultiInputValuesTypes;
    emptyObject?: unknown;
    isLoading?: boolean;
  }>(),
  { type: MultiInputValuesTypes.NUMBER, isLoading: false }
);

const emits = defineEmits<{
  (event: "update:modelValue", value: unknown[]): void;
  (event: "itemRemove", index: number): void;
}>();

const values = computed({
  get(): unknown[] {
    return props.modelValue;
  },
  set(value: unknown[]) {
    emits("update:modelValue", value);
  },
});

const itemRefs = ref<HTMLElement>();

const handleAddingItem = async () => {
  addItem();
  await nextTick();
  focusFirstInputInNewItem();
};

const addItem = () => {
  const emptyObject = props.emptyObject || {};

  if (props.type === MultiInputValuesTypes.OBJECT) {
    values.value = values.value.concat(...[emptyObject]);
    return;
  }
  values.value = values.value.concat(undefined);
};

const focusFirstInputInNewItem = () => {
  const lastItemIndex = values.value.length - 1;
  const lastItemRef: HTMLElement = itemRefs.value?.[lastItemIndex];

  if (!lastItemRef) {
    return;
  }

  const firtInputOfLastItem = lastItemRef.getElementsByTagName("input")[0];
  firtInputOfLastItem?.focus();
};

const removeItem = (index: number) => {
  const array = [...values.value];
  array.splice(index, 1);
  values.value = array;
  emits("itemRemove", index);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
