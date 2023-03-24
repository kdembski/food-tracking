<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "CModal",
  components: { CButton, CLoader },
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Title",
  },
  submitButtonLabel: {
    type: String,
    default: "Submit",
  },
  submitButtonColor: {
    type: String,
    default: "primary",
    validator: (value: string) => {
      return ["primary", "secondary", "error"].indexOf(value) !== -1;
    },
  },
  isSubmitButtonDisabled: {
    type: Boolean,
    default: false,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  containerElement: {
    type: String,
    default: "div",
  },
});

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
  (event: "submit"): void;
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    emits("update:isOpen", value);
  },
});

const closeModal = () => {
  _isOpen.value = false;
};

const onSubmit = () => {
  emits("submit");
};

const isContainerForm = () => {
  return props.containerElement === "form";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
