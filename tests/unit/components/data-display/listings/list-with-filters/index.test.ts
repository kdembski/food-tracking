import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import CListWithFilters from "@/components/data-display/listings/list-with-filters/index.vue";

describe("List With Filters Component", () => {
  let wrapper: any;
  let store: any;
  let actions: any;
  let getters: any;
  const defaultFilters = {
    currentPage: 1,
    pageSize: 20,
    sortAttribute: "attribute1",
    sortDirection: "asc",
    custom: {
      searchPhrase: "",
      tags: "",
    },
  };
  const list = ["item1", "item2", "item3"];
  const tags = [
    {
      name: "tag1",
    },
    {
      name: "tag2",
    },
    {
      name: "tag3",
    },
  ];
  const suggestions = [
    {
      value: null,
      label: "suggestion1",
    },
  ];
  let mainContainerScrollValue = 0;

  const mountComponent = (enableTags = true, enableRandomButton = true) => {
    actions = {
      loadList: jest.fn(),
      loadTags: jest.fn(),
      loadSuggestions: jest.fn(),
    };

    getters = {
      list: () => list,
      isListLoading: () => false,
      tags: () => tags,
      isTagsLoading: () => false,
      getSuggestions: () => suggestions,
      isSuggestionsLoading: () => false,
    };

    store = createStore({
      state: {
        mainContainerScrollValue,
      },
      modules: {
        test: {
          actions,
          getters,
          namespaced: true,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CListWithFilters, {
      props: {
        listName: "testList",
        storeModuleName: "test",

        defaultFilters,
        sortOptions: [
          {
            value: {
              sortAttribute: "attribute1",
              sortDirection: "asc",
            },
            label: "attribute1",
            icon: "arrow-down-a-z",
          },
          {
            value: {
              sortAttribute: "attribute2",
              sortDirection: "desc",
            },
            label: "attribute2",
            icon: "arrow-down-z-a",
          },
        ],
        enableTags,
        enableRandomButton,
      },
      global: global.settings,
    });
  };

  beforeEach(async () => {
    mountComponent();
    jest.useFakeTimers();
  });

  it("Should load list on mounted", async () => {
    expect(wrapper.vm.list).toStrictEqual(list);
    expect(actions.loadList).toHaveBeenCalledWith(
      expect.any(Object),
      defaultFilters
    );
  });

  it("Should load tags on mounted", async () => {
    expect(wrapper.vm.availableTags).toStrictEqual(tags);
    expect(actions.loadTags).toHaveBeenCalledTimes(1);
  });

  it("Should not load tags on mounted if enableTags is false", async () => {
    mountComponent(false);
    expect(actions.loadTags).toHaveBeenCalledTimes(0);
  });

  it("Should set filters based on default filters", async () => {
    expect(wrapper.vm.filters).toStrictEqual(defaultFilters);
  });

  it("Should set filters in local storage", async () => {
    expect(localStorage.__STORE__["testListFilters"]).toBe(
      JSON.stringify(defaultFilters)
    );
  });

  it("Should pull filters from local storage", async () => {
    const filters = {
      currentPage: 2,
      pageSize: 20,
      sortAttribute: "attribute2",
      sortDirection: "desc",
      custom: {
        searchPhrase: "",
        tags: "",
      },
    };
    localStorage.setItem("testListFilters", JSON.stringify(filters));

    mountComponent();
    expect(wrapper.vm.filters).toStrictEqual(filters);
  });

  it("Should toggle mobile filter on toggleFiltersOnMobile call", async () => {
    expect(wrapper.vm.areMobileFiltersOpen).toBe(false);
    await wrapper.vm.toggleFiltersOnMobile();
    expect(wrapper.vm.areMobileFiltersOpen).toBe(false);

    window.innerWidth = 500;
    mountComponent();

    expect(wrapper.vm.areMobileFiltersOpen).toBe(false);
    await wrapper.vm.toggleFiltersOnMobile();
    expect(wrapper.vm.areMobileFiltersOpen).toBe(true);

    await wrapper.vm.toggleFiltersOnMobile();
    expect(wrapper.vm.areMobileFiltersOpen).toBe(false);
    jest.runAllTimers();
  });
});
