import { ListFilters } from "@/types/components/list";
import { Ref } from "vue";

export function useTags(
  filters: Ref<ListFilters>,
  handleListLoadingProccess: () => void
) {
  const filterByTags = (tags: string) => {
    filters.value.tags = tags;
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const addTagAndFilter = (name: string) => {
    if (!name) {
      return;
    }
    let tags = filters.value.tags;

    if (tags?.includes(name)) {
      return;
    }

    if (tags) {
      tags += "," + name;
    } else {
      tags = name;
    }

    filterByTags(tags);
  };

  return {
    filterByTags,
    addTagAndFilter,
  };
}
