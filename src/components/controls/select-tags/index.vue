<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
import CInput from "@/components/controls/input/index.vue";
import Item from "./item/index.vue";
import Loader from "./loader/index.vue";

export default {
  name: "CSelectTags",
  components: { CTags, Item, Loader, CInput },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { Tag } from "@/types/components/tags";
import { cloneDeep } from "lodash";

const props = defineProps({
  tags: {
    type: Array as () => Tag[],
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    deafult: false,
  },
  selectedTags: {
    type: String,
    default: "",
  },
  withCounts: {
    type: Boolean,
    deafult: false,
  },
  enableAddingTags: {
    type: Boolean,
    default: false,
  },
  enableSortingSelectedToFront: {
    type: Boolean,
    default: false,
  },
  inputIcon: {
    type: String,
    default: "tags",
  },
});

const emit = defineEmits<{
  (e: "update:selectedTags", tags: string): void;
  (e: "update:tags", tags: Tag[]): void;
}>();

const container: Ref<HTMLElement | undefined> = ref();
const inputRef: Ref<{ input: HTMLInputElement } | undefined> = ref();
const searchPhrase = ref("");

const _selectedTags = computed({
  get(): string[] {
    if (!props.selectedTags) {
      return [];
    }
    return props.selectedTags.split(",");
  },
  set(tags: string[]) {
    clearSearchPhrase();
    emit("update:selectedTags", tags.join(","));
  },
});

const _tags = computed({
  get(): Tag[] {
    return props.tags;
  },
  set(tags: Tag[]) {
    emit("update:tags", tags);
  },
});

const getPreparedTags = (tags: Tag[]) => {
  return sortSelectedToFront(filterBySearchPhrase(tags));
};

const isTagSelected = (tag: Tag) => {
  return _selectedTags.value.some((tagName) => tagName === tag.name);
};

const isTagExisting = (newTag: Tag) => {
  return _tags.value.some((tag) => tag.name === newTag.name);
};

const clearSearchPhrase = () => {
  searchPhrase.value = "";
};

const filterBySearchPhrase = (tags: Tag[]) => {
  return tags.filter((tag) => {
    return tag.name.simplify().includes(searchPhrase.value?.simplify());
  });
};

const sortSelectedToFront = (tags: Tag[]) => {
  if (!props.enableSortingSelectedToFront) {
    return tags;
  }

  const tagsClone = cloneDeep(tags);
  return tagsClone.sort((tag) => {
    if (isTagSelected(tag)) {
      return -1;
    }

    return 1;
  });
};

const onNewTagClick = () => {
  if (!searchPhrase.value) {
    inputRef.value?.input.focus();
    return;
  }

  addTagToOptions(searchPhrase.value);
  addTagToSelected(searchPhrase.value);
};

const addTagToSelected = (tagName: string) => {
  if (!tagName) {
    return;
  }

  if (isTagSelected({ name: tagName })) {
    return;
  }

  _selectedTags.value = _selectedTags.value.concat(tagName);
};

const addTagToOptions = (tagName: string) => {
  if (isTagExisting({ name: tagName })) {
    return;
  }

  _tags.value = _tags.value.concat({ name: tagName });
};

defineExpose({ addTagToSelected });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
