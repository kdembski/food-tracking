<template src="./template.html"></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CLoader",
  props: {
    circleHeight: {
      type: String,
      default: "55",
    },
    circleWidth: {
      type: String,
      default: "55",
    },
  },
  methods: {
    calculateStrokeWidth() {
      return (200 / (parseInt(this.circleWidth) + 30)).toFixed(1);
    },
  },
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
