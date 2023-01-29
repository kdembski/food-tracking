import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import module from "@/store/ingredient/category/index";
import {
  IngredientCategoryOption,
  IngredientCategoriesList,
} from "@/types/ingredients/category";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Ingredient Category Store Module", () => {
  let store: any;
  let toastNotification: any;
  let list: IngredientCategoriesList;
  let options: IngredientCategoryOption[];
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

    list = {
      data: [
        {
          id: 1,
          name: "name 1",
        },
        {
          id: 2,
          name: "name 2",
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

    options = [
      {
        id: 1,
        name: "name 1",
      },
      {
        id: 2,
        name: "name 2",
      },
    ];

    store = createStore({
      state: {
        toastNotification,
      },
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
      "service/ingredients/categories?page=1&size=10&searchPhrase=test&sortAttribute=attr&sortDirection=dir&tags=tag"
    );
    expect(store.getters["module/list"]).toEqual(list);
    expect(store.getters["module/isLoadingList"]).toBe(false);
  });

  it("Should show error notification on failed loadList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("module/loadList", listFilters)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set options to state on successful loadOptions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: options }));
    store.dispatch("module/loadOptions");
    expect(store.state.module.isLoadingOptions).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories/options"
    );
    expect(store.state.module.options).toEqual(options);
    expect(store.state.module.isLoadingOptions).toBe(false);
    expect(store.getters["module/options"]).toEqual([
      {
        value: 1,
        label: "name 1",
      },
      {
        value: 2,
        label: "name 2",
      },
    ]);
  });

  it("Should show error notification on failed loadOptions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("module/loadOptions")).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set single to state on successful load action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("module/load", 1);
    expect(store.state.module.isLoading).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories/1"
    );
    expect(store.state.module.single).toEqual("test");
    expect(store.state.module.isLoading).toBe(false);
  });

  it("Should show error notification on failed load action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("module/load", 1)).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful create action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    store.dispatch("module/create", item);
    expect(store.state.module.isSubmitting).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "service/ingredients/categories",
      item
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmitting).toBe(false);
  });

  it("Should show error notification on failed create action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("module/create", item)).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful update action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch("module/update", item);
    expect(store.state.module.isSubmitting).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith(
      "service/ingredients/categories/1",
      item
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmitting).toBe(false);
  });

  it("Should show error notification on failed update action dispatch", async () => {
    const item = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("module/update", item)).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful delete action dispatch", async () => {
    mockAxiosDelete.mockImplementation(() => Promise.resolve());
    store.dispatch("module/delete", 1);
    expect(store.state.module.isSubmitting).toBe(true);
    await flushPromises();

    expect(mockAxiosDelete).toHaveBeenCalledWith(
      "service/ingredients/categories/1"
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmitting).toBe(false);
  });

  it("Should show error notification on failed delete action dispatch", async () => {
    mockAxiosDelete.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("module/delete", 1)).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });
});
