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

interface tagSettings {
  name: string;
  icon?: string;
  lightColor?: string;
  darkColor?: string;
}

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
    darkColor: "#6b3400",
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
      };
    }

    return tagSettings;
  });
});
const tagsCount = computed(() => tagsArray.value.length);

const isDarkModeEnabled = computed(() => store.state.isDarkModeEnabled);
const getTagColorStyles = (tagSettings: tagSettings) => {
  if (!tagSettings.darkColor || !tagSettings.lightColor) {
    return false;
  }

  if (isDarkModeEnabled.value) {
    return {
      color: tagSettings.lightColor,
      backgroundColor: tagSettings.darkColor,
    };
  }

  return {
    color: tagSettings.darkColor,
    backgroundColor: tagSettings.lightColor,
  };
};

const container = ref<HTMLElement | null>(null);

const getLoaderRowItemsCount = () => {
  if (!(container.value && container.value.clientWidth)) {
    return 5;
  }

  const itemsCount = Math.floor(container.value.clientWidth / 80);
  if (itemsCount < 5) {
    return 5;
  }
  return itemsCount;
};

const { isMobile } = useWindowSize();
const getLoaderRowsCount = () => {
  if (isMobile.value) return 3;
  return 1;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
