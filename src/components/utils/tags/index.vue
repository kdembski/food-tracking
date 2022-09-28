<script lang="ts">
export default {
  name: "CTags",
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
});

const tagsSettings = [
  { name: "vege", lightColor: "#c1ffd2", darkColor: "#05541c" },
  {
    name: "szybkie",
    lightColor: "#fff8bb",
    darkColor: "#806100",
  },
  {
    name: "śniadanie",
    lightColor: "#ffd9b5",
    darkColor: "#4a3522",
  },
  {
    name: "obiad",
    lightColor: "#ffd0d0",
    darkColor: "#750101",
  },
  {
    name: "kolacja",
    lightColor: "#bfe5f2",
    darkColor: "#002659",
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

const isDarkModeEnabled = computed(() => store.getters["isDarkModeEnabled"]);

const getTagColorStyles = (tagSettings: TagSettings) => {
  if (!tagSettings.darkColor || !tagSettings.lightColor) {
    return false;
  }

  if (isDarkModeEnabled.value) {
    return {
      color: tagSettings.lightColor,
      backgroundColor: tagSettings.darkColor,
      borderColor: tagSettings.lightColor + "21",
    };
  }

  return {
    color: tagSettings.darkColor,
    backgroundColor: tagSettings.lightColor,
    borderColor: tagSettings.darkColor + "21",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
