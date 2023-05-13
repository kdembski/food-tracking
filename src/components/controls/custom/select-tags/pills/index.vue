<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
import CInput from "@/components/controls/inputs/input/index.vue";
import Item from "./item/index.vue";
import Loader from "./loader/index.vue";

export default {
  name: "CSelectTags - Pills",
  components: { CTags, Item, Loader, CInput },
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { Tag } from "@/types/components/utils/tags";
import { cloneDeep } from "lodash";
import { useCommonMethods } from "../composables/common-methods";

const props = withDefaults(
  defineProps<{
    tags?: Tag[];
    selectedTags: string;
    isLoading?: boolean;
    withCounts?: boolean;
    enableAddingTags?: boolean;
    enableSortingSelectedToFront?: boolean;
    inputIcon?: string;
  }>(),
  {
    isLoading: false,
    enableAddingTags: false,
    withCounts: false,
    enableSortingSelectedToFront: false,
    inputIcon: "tags",
  }
);

const emits = defineEmits<{
  (e: "update:selectedTags", tags: string): void;
  (e: "update:tags", tags: Tag[]): void;
}>();

const {
  _selectedTags,
  _tags,
  addTagToSelected,
  addTagToOptions,
  isTagSelected,
} = useCommonMethods(props, emits);

const container: Ref<HTMLElement | undefined> = ref();
const inputRef: Ref<{ input: HTMLInputElement } | undefined> = ref();
const searchPhrase = ref("");

const getPreparedTags = (tags: Tag[]) => {
  return sortSelectedToFront(filterBySearchPhrase(tags));
};

const clearSearchPhrase = () => {
  searchPhrase.value = "";
};

const filterBySearchPhrase = (tags: Tag[]) => {
  return tags.filter((tag) => {
    return tag.name.simplify().startsWith(searchPhrase.value?.simplify());
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
  clearSearchPhrase();
};

defineExpose({ addTagToSelected });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
