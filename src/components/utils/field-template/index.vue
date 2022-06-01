<script lang="ts">
import CTransition from "@/components/utils/transition/index.vue";

export default {
  name: "CFieldTemplate",
  components: { CTransition },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFieldProps } from "./composables/field-props";

const props = defineProps({
  ...useFieldProps().fieldProps,
});

const isInvalid = computed((): boolean => {
  return !!props.errorMessage;
});

const getFieldWrapperClasses = (): string => {
  if (isInvalid.value) {
    return "field__wrapper--invalid";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
