import { useFilters } from "@/components/data-display/composables/filters/index";

const store = {
  getters: {
    getSuggestions: "suggestions",
    isLoadingSuggestions: false,
  },
  dispatch: jest.fn(),
};
jest.mock("vuex", () => ({
  useStore: () => store,
}));

describe("List With Filters - Filters", () => {
  const defaultFilters = {
    currentPage: 1,
    pageSize: 20,
    searchPhrase: "",
    sortAttribute: "attribute1",
    sortDirection: "asc",
    tags: "",
  };
  let composable: any;
  const handleListLoadingProccess = jest.fn();

  beforeEach(() => {
    composable = useFilters(
      defaultFilters,
      handleListLoadingProccess,
      "getSuggestions",
      "loadSuggestions",
      "isLoadingSuggestions"
    );

    jest.useFakeTimers();
  });

  it("Should change current page on changeCurrentPage call", async () => {
    composable.changeCurrentPage(2);
    expect(composable.filters.value.currentPage).toEqual(2);
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });

  it("areFiltersEqualToDefault shouls return true if filters are equal to default filters", async () => {
    expect(composable.areFiltersEqualToDefault()).toBe(true);
    composable.changeCurrentPage(2);
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(1);
    expect(composable.areFiltersEqualToDefault()).toBe(false);
  });

  it("clearFilters should set filters to default", async () => {
    composable.clearFilters();
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(0);
    composable.changeCurrentPage(2);
    expect(composable.areFiltersEqualToDefault()).toBe(false);
    composable.clearFilters();
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(2);
    expect(composable.areFiltersEqualToDefault()).toBe(true);
  });

  it("filterByTags should set filter tags and reload list", async () => {
    composable.filterByTags("test1,test2");
    expect(composable.filters.value.tags).toEqual("test1,test2");
    expect(composable.filters.value.currentPage).toEqual(1);
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });

  it("filterBySearchPhrase should reload list", async () => {
    composable.filterBySearchPhrase();
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });

  it("filterBySearchPhraseWithDelay should reload list", async () => {
    composable.filterBySearchPhraseWithDelay();
    jest.runAllTimers();
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(0);

    composable.filters.value.searchPhrase = "test";
    composable.filterBySearchPhraseWithDelay();
    jest.runAllTimers();
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });

  it("loadSearchSuggestions should load suggestions with prepared filters", async () => {
    composable.filters.value.tags = "test1";
    composable.loadSearchSuggestions();
    expect(store.dispatch).toHaveBeenCalledWith("loadSuggestions", {
      searchPhrase: "",
      tags: "test1",
    });
  });

  it("Should set searchSuggestions based on store getter", async () => {
    expect(composable.searchSuggestions.value).toEqual("suggestions");
  });

  it("Should set selected sort based on filters", async () => {
    expect(composable.selectedSort.value).toStrictEqual({
      sortAttribute: "attribute1",
      sortDirection: "asc",
    });
  });

  it("getSelectedSortIcon should return icon associated with selected sort option", async () => {
    expect(
      composable.getSelectedSortIcon([
        {
          value: { sortAttribute: "attribute1", sortDirection: "asc" },
          icon: "icon1",
        },
        {
          value: { sortAttribute: "attribute2", sortDirection: "desc" },
          icon: "icon2",
        },
      ])
    ).toEqual("icon1");
  });

  it("sort should set sortAttribute and sortDirection in filters and reload list", async () => {
    composable.sort({ sortAttribute: "attribute2", sortDirection: "desc" });
    expect(composable.filters.value.sortAttribute).toEqual("attribute2");
    expect(composable.filters.value.sortDirection).toEqual("desc");
    expect(handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });
});
