import { ListFilters } from "@/types/components/data-display/list";
import { Ref } from "vue";

export function useTagsFilter(
  filters: Ref<ListFilters<any>>,
  handleListLoadingProccess: () => void
) {
  const filterByTags = (tags: string) => {
    filters.value.custom.tags = tags;
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  return {
    filterByTags,
  };
}
