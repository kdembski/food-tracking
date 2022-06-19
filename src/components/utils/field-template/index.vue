<script lang="ts">
import CTransition from "@/components/utils/transition/index.vue";
import CIcon from "@/components/utils/icon/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "CFieldTemplate",
  components: { CTransition, CIcon, CLoader },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useFieldProps } from "./composables/field-props";

const props = defineProps({
  ...useFieldProps().fieldProps,
});

const isInvalid = computed((): boolean => {
  return !!props.errorMessage;
});

const hasIconRight = computed((): boolean => {
  return isInvalid.value || props.isSuccessful || props.isLoading;
});

const getFieldClasses = (): Array<string> => {
  let classes = [];

  if (isInvalid.value) {
    classes.push("field--invalid");
  }
  if (props.isSuccessful) {
    classes.push("field--successful");
  }
  if (props.icon) {
    classes.push("field--with-icon-left");
  }
  if (hasIconRight.value) {
    classes.push("field--with-icon-right");
  }
  if (props.isDisabled || props.isLoading) {
    classes.push("field--disabled");
  }
  if (props.label) {
    classes.push("field--with-label");
  }

  return classes;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
