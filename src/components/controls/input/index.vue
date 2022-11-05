<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";

export default {
  name: "CInput",
  components: { CFieldTemplate },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";

const { getFieldTemplateProps } = useFieldProps();

const props = defineProps({
  ...useFieldProps().fieldProps,
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const input: Ref<HTMLInputElement | undefined> = ref();
defineExpose({ input });

const value = computed({
  get(): string | number {
    return props.modelValue;
  },
  set(value: string | number) {
    emits("update:modelValue", value);
  },
});

const onInput = (e: KeyboardEvent) => {
  if (!props.isLoading) {
    return;
  }
  e.preventDefault();
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
