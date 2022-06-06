<script lang="ts">
export default { name: "CTags" };
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  tags: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "click", value: string): void;
}>();

const tagsArray = computed(() => {
  const namesArray: Array<string> = props.tags.split(",");

  return namesArray.map((name) => {
    let icon = "";

    if (name.includes("veg")) {
      icon = "leaf";
    }

    if (["hot", "spicy", "ostr"].some((item) => name.includes(item))) {
      icon = "fire";
    }

    if (name.includes("szybk")) {
      icon = "clock";
    }

    return {
      name,
      icon,
    };
  });
});

const onClick = (name: string) => {
  emit("click", name);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
