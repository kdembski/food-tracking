import { ListFilters } from "@/types/components/data-display/list";
import { Ref } from "vue";

export function useTagsFilter(
  filters: Ref<ListFilters>,
  handleListLoadingProccess: () => void
) {
  const filterByTags = (tags: string) => {
    filters.value.tags = tags;
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  return {
    filterByTags,
  };
}
