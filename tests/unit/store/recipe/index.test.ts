import { RecipesList } from "@/types/recipes/recipe";
import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import module from "@/store/recipe/index";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Recipe Store Module", () => {
  let store: any;
  let actions: any;
  let toastNotification: any;
  let list: RecipesList;
  const listFilters = {
    currentPage: 1,
    pageSize: 10,
    searchPhrase: "test",
    tags: "tag",
    sortAttribute: "attr",
    sortDirection: "dir",
  };

  beforeEach(async () => {
    toastNotification = {
      success: jest.fn(),
      error: jest.fn(),
    };

    actions = {
      handleDefaultError: jest.fn(),
      handleComplexError: jest.fn(),
    };

    list = {
      data: [
        {
          id: 1,
          recipeName: "name 1",
          preparationTime: 1,
          tags: "tag1,tag2",
          cookidooLink: "link 1",
          cookedDate: new Date(2000, 1, 1),
          datesFromLastYear: [[new Date(2000, 1, 1)]],
        },
        {
          id: 2,
          recipeName: "name 2",
          preparationTime: 2,
          tags: "tag1,tag2",
          cookidooLink: "link 2",
          cookedDate: new Date(2000, 1, 2),
          datesFromLastYear: [[new Date(2000, 1, 2)]],
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 10,
        firstRecord: 1,
        lastRecord: 20,
        totalRecords: 100,
      },
    };

    store = createStore({
      state: {
        toastNotification,
      },
      actions,
      modules: {
        module,
      },
    });
  });

  it("Should set list to state on successful loadList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: list }));
    store.dispatch("module/loadList", listFilters);
    expect(store.getters["module/isLoadingList"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/recipes?page=1&size=10&searchPhrase=test&sortAttribute=attr&sortDirection=dir&tags=tag"
    );
    expect(store.getters["module/list"]).toEqual(list);
    expect(store.getters["module/isLoadingList"]).toBe(false);
  });

  it("Should show error notification on failed loadList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/loadList", listFilters);
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should set tags to state on successful loadTags action dispatch", async () => {
    const filters = {
      searchPhrase: "test",
      tags: "tag",
    };
    const tags = "tag1,tag2";

    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: tags }));
    store.dispatch("module/loadTags", filters);
    expect(store.getters["module/isLoadingTags"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/recipes/tags?searchPhrase=test&tags=tag"
    );
    expect(store.getters["module/tags"]).toEqual(tags);
    expect(store.getters["module/isLoadingTags"]).toBe(false);
  });

  it("Should show error notification on failed loadTags action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/loadTags");
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should set suggestions to state on successful loadSearchSuggestions action dispatch", async () => {
    const filters = {
      searchPhrase: "test",
      tags: "tag",
    };
    const suggestions = ["test"];

    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: ["test"] }));
    store.dispatch("module/loadSearchSuggestions", filters);
    expect(store.getters["module/isLoadingSearchSuggestions"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/recipes/suggestions?searchPhrase=test&tags=tag"
    );
    expect(store.state.module.searchSuggestions).toEqual(suggestions);
    expect(store.getters["module/isLoadingSearchSuggestions"]).toBe(false);
  });

  it("Should show error notification on failed loadSearchSuggestions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/loadSearchSuggestions");
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should return count on successful getCount action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: 30 }));
    await expect(store.dispatch("module/getCount")).resolves.toEqual(30);
    await flushPromises();
    expect(mockAxiosGet).toHaveBeenCalledWith("service/recipes/count");
  });

  it("Should show error notification on failed getCount action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/getCount");
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should return search suggestion options from getSearchSuggestions getter", async () => {
    await store.commit("module/setSearchSuggestions", null);
    expect(store.getters["module/searchSuggestions"]).toEqual([]);
    await store.commit("module/setSearchSuggestions", ["test1", "test2"]);
    expect(store.getters["module/searchSuggestions"]).toEqual([
      { value: null, label: "test1" },
      { value: null, label: "test2" },
    ]);
  });

  it("Should set single to state on successful load action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("module/load", 1);
    expect(store.state.module.isLoading).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/recipes/1");
    expect(store.state.module.single).toEqual("test");
    expect(store.state.module.isLoading).toBe(false);
  });

  it("Should show error notification on failed load action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/load", 1);
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful create action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve({ data: {} }));
    store.dispatch("module/create", item);
    expect(store.state.module.isSubmitting).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith("service/recipes", item);
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmitting).toBe(false);
  });

  it("Should show error notification on failed create action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/create", item);
    await flushPromises();
    expect(actions.handleComplexError).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful update action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch("module/update", item);
    expect(store.state.module.isSubmitting).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith("service/recipes/1", item);
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmitting).toBe(false);
  });

  it("Should show error notification on failed update action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/update", item);
    await flushPromises();
    expect(actions.handleComplexError).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful delete action dispatch", async () => {
    mockAxiosDelete.mockImplementation(() => Promise.resolve());
    store.dispatch("module/delete", 1);
    expect(store.state.module.isSubmitting).toBe(true);
    await flushPromises();

    expect(mockAxiosDelete).toHaveBeenCalledWith("service/recipes/1");
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmitting).toBe(false);
  });

  it("Should show error notification on failed delete action dispatch", async () => {
    mockAxiosDelete.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/delete", 1);
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });
});
