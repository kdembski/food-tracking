import flushPromises from "flush-promises";
import { createStore } from "vuex";
import {
  OrderedFoodList,
  OrderedFood,
} from "@/types/ordered-food/ordered-food";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import module from "@/store/ordered-food/index";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Ordered Food Store Module", () => {
  let store: any;
  let toastNotification: any;
  let list: OrderedFoodList;
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
          foodName: "name 1",
          placeName: "place 1",
          tags: "tag1,tag2",
          orderDate: new Date(2000, 1, 1),
          orderDatesInCurrentMonth: [new Date(2000, 1, 1)],
        },
        {
          id: 2,
          foodName: "name 2",
          placeName: "place 2",
          tags: "tag1,tag2",
          orderDate: new Date(2000, 1, 2),
          orderDatesInCurrentMonth: [new Date(2000, 1, 2)],
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
      "service/ordered?page=1&size=10&sortAttribute=attr&sortDirection=dir&searchPhrase=test&tags=tag"
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
      "service/ordered/tags?searchPhrase=test&tags=tag"
    );
    expect(store.getters["module/tags"]).toEqual(tags);
    expect(store.getters["module/isLoadingTags"]).toBe(false);
  });

  it("Should show error notification on failed loadTags action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("module/loadTags")).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set single to state on successful load action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("module/load", 1);
    expect(store.state.module.isLoading).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/ordered/1");
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

    expect(mockAxiosPost).toHaveBeenCalledWith("service/ordered", item);
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

    expect(mockAxiosPut).toHaveBeenCalledWith("service/ordered/1", item);
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

    expect(mockAxiosDelete).toHaveBeenCalledWith("service/ordered/1");
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
