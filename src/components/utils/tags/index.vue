<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
export default {
  name: "CTags",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Tag, TagSettings } from "./types/tags";
import { isArray } from "lodash";

const store = useStore();

const props = defineProps({
  tags: {
    type: [String, Array as () => Array<Tag>],
    default: "",
  },
  isLoading: {
    type: Boolean,
    deafult: false,
  },
  type: {
    type: String,
    default: "all",
    validator: (value: string) => {
      return ["all", "customized", "default"].indexOf(value) !== -1;
    },
  },
});

const tagsSettings = [
  { name: "vege", lightColor: "#c1ffd2", darkColor: "#077426" },
  { name: "ostre", lightColor: "#ffdda9", darkColor: "#e70f00" },
  {
    name: "szybkie",
    lightColor: "#fff8bb",
    darkColor: "#aa8200",
  },
  {
    name: "śniadanie",
    lightColor: "#ffd9b5",
    darkColor: "#594430",
  },
  {
    name: "obiad",
    lightColor: "#ffd0d0",
    darkColor: "#990000",
  },
  {
    name: "kolacja",
    lightColor: "#bfe5f2",
    darkColor: "#003780",
  },
];

const convertTagsToArray = (tags: string) => {
  return tags.split(",").map((tag) => {
    return {
      name: tag,
    };
  });
};

const addSettingsToTags = (tags: Tag[]) => {
  return tags.map((tag: Tag) => {
    const tagSettings = tagsSettings.find(
      (tagSettings: TagSettings) => tagSettings.name === tag.name
    );

    if (tagSettings) {
      return Object.assign(tag, tagSettings);
    }

    return tag;
  });
};

const tagsArray = computed(() => {
  let tags = props.tags;

  if (!tags) {
    return [];
  }

  if (!isArray(tags)) {
    tags = convertTagsToArray(tags);
  }

  return addSettingsToTags(tags);
});

const tagsCount = computed(() => tagsArray.value.length);

const customizedTags = computed(() => {
  return tagsArray.value.filter((tag) => tag.lightColor);
});

const defaultTags = computed(() => {
  return tagsArray.value.filter((tag) => !tag.lightColor);
});

const getTagsArrayBasedOnType = () => {
  switch (props.type) {
    case "all":
      return tagsArray.value;
    case "customized":
      return customizedTags.value;
    case "default":
      return defaultTags.value;
    default:
      return tagsArray.value;
  }
};

const areTagsVisible = () => {
  return getTagsArrayBasedOnType().length > 0 || props.isLoading;
};

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
    backgroundColor: tagSettings.lightColor + "aa",
    borderColor: tagSettings.darkColor + "20",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
