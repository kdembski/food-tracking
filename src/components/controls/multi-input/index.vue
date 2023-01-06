<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CMultiInput",
  components: { CButton, CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { MultiInputValuesTypes } from "@/types/components/multi-input";

const props = withDefaults(
  defineProps<{
    modelValue: unknown[];
    label: string;
    type?: MultiInputValuesTypes;
    emptyObject?: unknown;
    isLoading?: boolean;
  }>(),
  { type: MultiInputValuesTypes.NUMBER, isLoading: false }
);

const emits = defineEmits<{
  (event: "update:modelValue", value: unknown[]): void;
}>();

const values = computed({
  get(): unknown[] {
    return props.modelValue;
  },
  set(value: unknown[]) {
    emits("update:modelValue", value);
  },
});

const addItem = () => {
  if (props.type === MultiInputValuesTypes.OBJECT) {
    values.value = values.value.concat(props.emptyObject);
    return;
  }
  values.value = values.value.concat(undefined);
};

const removeItem = (index: number) => {
  const array = [...values.value];
  array.splice(index, 1);
  values.value = array;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
