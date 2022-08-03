import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import CSelectTags from "./index.vue";

describe("Select Tags Component", () => {
  let wrapper: any = null;
  let store: any;
  let actions: any;
  let getters: any;
  const defaultFilters = {
    currentPage: 1,
    pageSize: 20,
    searchPhrase: "",
    sortAttribute: "attribute",
    sortDirection: "asc",
    tags: "",
  };
  const list = ["item1", "item2", "item3"];
  const tags = "tag1,tag2,tag3";

  beforeEach(async () => {
    actions = {
      loadList: jest.fn(),
      loadTags: jest.fn(),
      loadSuggestions: jest.fn(),
    };

    getters = {
      getList: () => list,
      isListLoading: () => false,
      getTags: () => tags,
      isTagsLoading: () => false,
      getSuggestions: () => tags,
      isSuggestionsLoading: () => false,
    };

    store = createStore({
      modules: {
        test: {
          actions,
          getters,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CSelectTags, {
      props: {
        listName: "testList",
        listGetterName: "test/getList",
        listLoadActionName: "test/loadList",
        listIsLoadingGetterName: "test/isListLoading",
        tagsGetterName: "test/getTags",
        tagsLoadActionName: "test/loadTags",
        tagsIsLoadingGetterName: "test/isTagsLoading",

        defaultFilters,
      },
      global: global.settings,
    });
  });

  it("Should load list on mounted", async () => {});
});
