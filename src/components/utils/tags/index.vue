<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
export default {
  name: "CTags",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
  tags: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    deafult: false,
  },
});

const tagsArray = computed(() => {
  if (!props.tags) {
    return [];
  }
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
const tagsCount = computed(() => tagsArray.value.length);

const container = ref<HTMLElement | null>(null);

const getLoaderItemsCount = () => {
  if (!(container.value && container.value.clientWidth)) {
    return 0;
  }

  return Math.floor(container.value.clientWidth / 90);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
