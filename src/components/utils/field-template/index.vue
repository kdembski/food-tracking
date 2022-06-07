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

const getFieldClasses = (): Array<string> => {
  let classes = [];

  if (isInvalid.value) {
    classes.push("field--invalid");
  }
  if (props.icon) {
    classes.push("field--with-icon");
  }

  return classes;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
