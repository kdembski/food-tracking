<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import Item from "./item/index.vue";
import Loader from "./loader/index.vue";

export default {
  name: "CSelectTags",
  components: { CTags, Item, Loader, CAutocomplete },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { Tag } from "@/types/components/tags";
import { cloneDeep } from "lodash";
import { DropdownOption } from "@/types/components/dropdown";

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
  enableSortOutSelected: {
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

const _selectedTags = computed({
  get(): string[] {
    if (!props.selectedTags) {
      return [];
    }
    return props.selectedTags.split(",");
  },
  set(tags: string[]) {
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

const sortTags = (tags: Tag[]) => {
  return sortOutSelectedTags(tags);
};

const isTagSelected = (tag: Tag) => {
  return _selectedTags.value.some((tagName) => tagName === tag.name);
};

const sortOutSelectedTags = (tags: Tag[]) => {
  if (!props.enableSortOutSelected) {
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

const getTagsOptions = (): DropdownOption<string>[] => {
  const tagsWithoutSelected = props.tags?.filter(
    (tag: Tag) =>
      !_selectedTags.value?.some((selectedTag) => selectedTag == tag.name)
  );

  return tagsWithoutSelected?.map((tag: Tag) => {
    return {
      value: tag.name,
      label: tag.name,
    };
  });
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

const addTagToOptions = (option: DropdownOption) => {
  _tags.value = _tags.value.concat({ name: option.label });
};

defineExpose({ addTagToSelected });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
