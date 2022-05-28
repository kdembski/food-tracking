<template src="./template.html"></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: [Boolean, Function],
      default: false,
    },
    variant: {
      type: String,
      default: "contained",
      validator: (value: string) => {
        return ["contained", "outlined", "text"].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      default: "primary",
      validator: (value: string) => {
        return ["primary", "secondary"].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      default: "normal",
      validator: (value: string) => {
        return ["small", "normal", "large"].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    getButtonClasses(): Array<string> {
      const varaintClass = "button-" + this.variant;
      const colorClass = "button-" + this.color;
      const sizeClass = "button-" + this.size;

      return [varaintClass, colorClass, sizeClass];
    },
  },
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
