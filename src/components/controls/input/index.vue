<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";

export default {
  name: "CInput",
  components: { CFieldTemplate },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref, useAttrs } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";

const { getFieldTemplateProps } = useFieldProps();
const attrs = useAttrs();

const props = defineProps({
  ...useFieldProps().fieldProps,
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number | null): void;
}>();

const input: Ref<HTMLInputElement | undefined> = ref();
defineExpose({ input });

const value = computed({
  get(): string | number | null {
    return props.modelValue;
  },
  set(value: string | number | null) {
    if (isTypeNumber() && value === "") {
      value = null;
    }

    emits("update:modelValue", value);
  },
});

const onInput = (e: KeyboardEvent) => {
  if (!props.isLoading) {
    return;
  }
  e.preventDefault();
};

const isTypeNumber = () => {
  return attrs.type === "number";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
