import { computed } from "vue";
import { Tag } from "@/types/components/utils/tags";

export function useCommonMethods(props: any, emits: any) {
  const _selectedTags = computed({
    get(): string[] {
      if (!props.selectedTags) {
        return [];
      }
      return props.selectedTags.split(",");
    },
    set(tags: string[]) {
      emits("update:selectedTags", tags.join(","));
    },
  });

  const _tags = computed({
    get(): Tag[] {
      return props.tags;
    },
    set(tags: Tag[]) {
      emits("update:tags", tags);
    },
  });

  const isTagSelected = (tag: Tag) => {
    return _selectedTags.value.some((tagName) => tagName === tag.name);
  };

  const isTagExisting = (newTag: Tag) => {
    return _tags.value.some((tag) => tag.name === newTag.name);
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

  return {
    _selectedTags,
    _tags,
    addTagToSelected,
    addTagToOptions,
    isTagSelected,
  };
}
