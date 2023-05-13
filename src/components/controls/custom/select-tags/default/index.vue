<script lang="ts">
import CAutocomplete from "@/components/controls/inputs/autocomplete/index.vue";

export default {
  name: "CSelectTags",
  components: { CAutocomplete },
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { Tag } from "@/types/components/utils/tags";
import { useSelectTagsCommonMethods } from "../composables/common-methods";

const props = withDefaults(
  defineProps<{
    tags?: Tag[];
    selectedTags?: string;
    isLoading?: boolean;
    enableAddingTags?: boolean;
    label?: string;
  }>(),
  { isLoading: false, enableAddingTags: false, label: "Tagi" }
);

const emits = defineEmits<{
  (e: "update:selectedTags", tags: string): void;
  (e: "update:tags", tags: Tag[]): void;
}>();

const { _selectedTags, _tags, addTagToSelected } = useSelectTagsCommonMethods(
  props,
  emits
);

const selectedValue = ref(null);
const inputValue = ref("");
const selectedRef = ref<HTMLElement>();
const container = ref<HTMLElement>();
const selectedKey = ref(0);

const clearValues = () => {
  selectedValue.value = null;
  inputValue.value = "";
};

const onModelValueUpdate = async (tagName: string) => {
  addTagToSelected(tagName);
  await nextTick();
  clearValues();
};

const removeTagFromSelected = (tag: string) => {
  _selectedTags.value = _selectedTags.value.filter(
    (selectedTag) => selectedTag !== tag
  );
  selectedKey.value++;
};

const addNewTag = (tag: string) => {
  addTagToSelected(tag);
};

const getTagOptions = () => {
  if (!_tags.value) {
    return [];
  }

  const options = _tags.value.map((tag) => ({
    value: tag.name,
    label: tag.name,
  }));

  return options.filter(
    (tag) =>
      !_selectedTags.value.some((selectedTag) => selectedTag === tag.value)
  );
};

const updateInputPadding = async (
  input = container.value?.getElementsByTagName("input")[0]
) => {
  if (!input) {
    return;
  }

  await nextTick();
  const selectedWidth = selectedRef.value?.clientWidth;
  input.style.paddingLeft = selectedWidth + "px";
};

watch([_selectedTags, () => props.isLoading], () => updateInputPadding(), {
  deep: true,
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
