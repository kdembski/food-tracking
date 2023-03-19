import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import module from "@/store/recipe/ingredient/index";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Recipe Ingredient Store Module", () => {
  let store: any;
  let actions: any;
  let toastNotification: any;

  beforeEach(async () => {
    toastNotification = {
      success: jest.fn(),
      error: jest.fn(),
    };

    actions = {
      handleDefaultError: jest.fn(),
      handleComplexError: jest.fn(),
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

  it("Should set collection to state on successful loadCollection action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("module/loadCollection", 1);
    expect(store.state.module.isLoadingCollection).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/recipes/1/ingredients");
    expect(store.state.module.collection).toEqual("test");
    expect(store.state.module.isLoadingCollection).toBe(false);
  });

  it("Should dispatch handleDefaultError on failed loadCollection action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/loadCollection", 1);
    await flushPromises();
    expect(actions.handleDefaultError).toHaveBeenCalledTimes(1);
  });

  it("Should send post api request on successful createCollection action dispatch", async () => {
    const collection = [{ id: 1 }];
    mockAxiosPost.mockImplementation(() => Promise.resolve({ data: {} }));
    store.dispatch("module/createCollection", { collection, recipeId: 1 });
    expect(store.state.module.isSubmittingCollection).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "service/recipes/1/ingredients",
      collection
    );
    expect(store.state.module.isSubmittingCollection).toBe(false);
  });

  it("Should show error notification on failed createCollection action dispatch", async () => {
    const collection = [{ id: 1 }];
    mockAxiosPost.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/createCollection", { collection, recipeId: 1 });
    await flushPromises();
    expect(actions.handleComplexError).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful updateCollection action dispatch", async () => {
    const collection = [{ id: 1 }];
    mockAxiosPut.mockImplementation(() => Promise.resolve({ data: {} }));
    store.dispatch("module/updateCollection", { collection, recipeId: 1 });
    expect(store.state.module.isSubmittingCollection).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith(
      "service/recipes/1/ingredients",
      collection
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.module.isSubmittingCollection).toBe(false);
  });

  it("Should show error notification on failed updateCollection action dispatch", async () => {
    const collection = [{ id: 1 }];
    mockAxiosPut.mockImplementation(() => Promise.reject("error"));
    store.dispatch("module/updateCollection", { collection, recipeId: 1 });
    await flushPromises();
    expect(actions.handleComplexError).toHaveBeenCalledTimes(1);
  });
});
