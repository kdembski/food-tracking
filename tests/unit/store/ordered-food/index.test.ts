import flushPromises from "flush-promises";
import { createStore } from "vuex";
import { OrderedFoodList, OrderedFood } from "@/types/ordered-food";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import orderedFood from "@/store/ordered-food/index";
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
  let orderedFoodList: OrderedFoodList;
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

    orderedFoodList = {
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
        orderedFood,
      },
    });
  });

  it("Should set ordered food list to state on successful loadOrderedFoodList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: orderedFoodList })
    );
    store.dispatch("orderedFood/loadOrderedFoodList", listFilters);
    expect(store.getters["orderedFood/isLoadingOrderedFoodList"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ordered?page=1&size=10&searchPhrase=test&sortAttribute=attr&sortDirection=dir&tags=tag"
    );
    expect(store.getters["orderedFood/orderedFoodList"]).toEqual(
      orderedFoodList
    );
    expect(store.getters["orderedFood/isLoadingOrderedFoodList"]).toBe(false);
  });

  it("Should show error notification on failed loadOrderedFoodList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("orderedFood/loadOrderedFoodList", listFilters)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ordered food tags to state on successful loadOrderedFoodTags action dispatch", async () => {
    const filters = {
      searchPhrase: "test",
      tags: "tag",
    };
    const tags = "tag1,tag2";

    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: tags }));
    store.dispatch("orderedFood/loadOrderedFoodTags", filters);
    expect(store.getters["orderedFood/isLoadingOrderedFoodTags"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ordered/tags?searchPhrase=test&tags=tag"
    );
    expect(store.getters["orderedFood/orderedFoodTags"]).toEqual(tags);
    expect(store.getters["orderedFood/isLoadingOrderedFoodTags"]).toBe(false);
  });

  it("Should show error notification on failed loadOrderedFoodTags action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("orderedFood/loadOrderedFoodTags")
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ordered food to state on successful loadOrderedFood action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("orderedFood/loadOrderedFood", 1);
    expect(store.state.orderedFood.isLoadingOrderedFood).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/ordered/1");
    expect(store.state.orderedFood.orderedFood).toEqual("test");
    expect(store.state.orderedFood.isLoadingOrderedFood).toBe(false);
  });

  it("Should show error notification on failed loadOrderedFood action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("orderedFood/loadOrderedFood", 1)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful createOrderedFood action dispatch", async () => {
    const orderedFood = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    store.dispatch("orderedFood/createOrderedFood", orderedFood);
    expect(store.state.orderedFood.isSubmittingOrderedFood).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith("service/ordered", orderedFood);
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.orderedFood.isSubmittingOrderedFood).toBe(false);
  });

  it("Should show error notification on failed createOrderedFood action dispatch", async () => {
    const orderedFood = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("orderedFood/createOrderedFood", orderedFood)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful updateOrderedFood action dispatch", async () => {
    const orderedFood = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch("orderedFood/updateOrderedFood", orderedFood);
    expect(store.state.orderedFood.isSubmittingOrderedFood).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith("service/ordered/1", orderedFood);
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.orderedFood.isSubmittingOrderedFood).toBe(false);
  });

  it("Should show error notification on failed updateOrderedFood action dispatch", async () => {
    const orderedFood = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("orderedFood/updateOrderedFood", orderedFood)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });
});
