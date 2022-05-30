<template src="./template.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default defineComponent({
  name: "CButton",
  components: { CLoader },
  props: {
    label: {
      type: String,
      default: "Button",
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
      default: "medium",
      validator: (value: string) => {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    getButtonClasses(): Array<string> {
      const varaintClass = "button-" + this.variant;
      const colorClass = "button-" + this.color;
      const sizeClass = "button-" + this.size;
      const disabledClass = "button-disabled";

      let classes = [varaintClass, colorClass, sizeClass];

      if (this.isDisabled || this.isLoading) {
        classes.push(disabledClass);
      }

      return classes;
    },

    getButtonContentClasses(): string {
      if (this.isLoading) {
        return "button_content-loading";
      }
      return "";
    },

    getLoaderSize(): string {
      switch (this.size) {
        case "small":
          return "20";
        case "medium":
          return "22";
        case "large":
          return "24";
        default:
          return "22";
      }
    },
  },
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
