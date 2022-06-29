<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
export default {
  name: "CTags",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/components/utils/composables/window-size";
import { TagSettings } from "./types/tags";

const store = useStore();

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

const tagsSettings = [
  { name: "vege", icon: "leaf", lightColor: "#c1ffd2", darkColor: "#077426" },
  { name: "ostre", icon: "fire", lightColor: "#ffdda9", darkColor: "#e70f00" },
  {
    name: "szybkie",
    icon: "clock",
    lightColor: "#fff8bb",
    darkColor: "#aa8200",
  },
  {
    name: "śniadanie",
    icon: "mug-saucer",
    lightColor: "#ffd9b5",
    darkColor: "#594430",
  },
  {
    name: "obiad",
    icon: "utensils",
    lightColor: "#ffd0d0",
    darkColor: "#990000",
  },
  {
    name: "kolacja",
    icon: "bell-concierge",
    lightColor: "#bfe5f2",
    darkColor: "#003780",
  },
];

const tagsArray = computed(() => {
  if (!props.tags) {
    return [];
  }
  const namesArray: Array<string> = props.tags.split(",");

  return namesArray.map((name) => {
    const tagSettings = tagsSettings.find((tag) => tag.name === name);

    if (!tagSettings) {
      return {
        name,
      } as TagSettings;
    }

    return tagSettings;
  });
});
const tagsCount = computed(() => tagsArray.value.length);

const customizedTags = computed(() => {
  return tagsArray.value.filter((tag) => tag.icon);
});

const defaultTags = computed(() => {
  return tagsArray.value.filter((tag) => !tag.icon);
});

const isDarkModeEnabled = computed(() => store.state.isDarkModeEnabled);
const getTagColorStyles = (tagSettings: TagSettings) => {
  if (!tagSettings.darkColor || !tagSettings.lightColor) {
    return false;
  }

  if (isDarkModeEnabled.value) {
    return {
      color: tagSettings.lightColor,
      backgroundColor: tagSettings.darkColor,
      borderColor: tagSettings.lightColor + "33",
    };
  }

  return {
    color: tagSettings.darkColor,
    backgroundColor: tagSettings.lightColor,
    borderColor: tagSettings.darkColor + "20",
  };
};

const container = ref<HTMLElement | null>(null);
const { isMobile } = useWindowSize();

const getFirstRowLoaderItemsCount = () => {
  if (!(container.value && container.value.clientWidth)) {
    return 5;
  }

  const itemsCount = Math.floor(container.value.clientWidth / 80);
  return itemsCount;
};

const getSecondRowLoaderItemsCount = () => {
  return Math.ceil(getFirstRowLoaderItemsCount() / 2);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
