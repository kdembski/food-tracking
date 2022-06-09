<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
export default {
  name: "CTags",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";

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

    if (name === "vege") {
      icon = "leaf";
    }

    if (name === "ostre") {
      icon = "fire";
    }

    if (name === "szybkie") {
      icon = "clock";
    }

    if (name === "śniadanie") {
      icon = "mug-saucer";
    }

    if (name === "obiad") {
      icon = "utensils";
    }

    if (name === "kolacja") {
      icon = "bell-concierge";
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
