<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";

export default {
  name: "CInput",
  components: { CFieldTemplate },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";

const { getFieldTemplateProps } = useFieldProps();

const props = defineProps({
  ...useFieldProps().fieldProps,
  modelValue: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const value = computed({
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});

const onInput = (e: KeyboardEvent) => {
  if (props.isLoading) {
    e.preventDefault();
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
