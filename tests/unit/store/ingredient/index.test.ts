import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import ingredient from "@/store/ingredient/index";
import { IngredientsList } from "@/types/ingredients/ingredient";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Ingredient Store Module", () => {
  let store: any;
  let toastNotification: any;
  let ingredientsList: IngredientsList;
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

    ingredientsList = {
      data: [
        {
          id: 1,
          name: "name 1",
          categoryId: 1,
          categoryName: "category 1",
          unitNames: ["unit 1", "unit 2"],
        },
        {
          id: 2,
          name: "name 2",
          categoryId: 2,
          categoryName: "category 2",
          unitNames: ["unit 1", "unit 2"],
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
        ingredient,
      },
    });
  });

  it("Should set ingredients list to state on successful loadIngredientsList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: ingredientsList })
    );
    store.dispatch("ingredient/loadIngredientsList", listFilters);
    expect(store.getters["ingredient/isLoadingIngredientsList"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients?page=1&size=10&searchPhrase=test&sortAttribute=attr&sortDirection=dir&tags=tag"
    );
    expect(store.getters["ingredient/ingredientsList"]).toEqual(
      ingredientsList
    );
    expect(store.getters["ingredient/isLoadingIngredientsList"]).toBe(false);
  });

  it("Should show error notification on failed loadIngredientsList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredient/loadIngredientsList", listFilters)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ingredient to state on successful loadIngredient action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("ingredient/loadIngredient", 1);
    expect(store.state.ingredient.isLoadingIngredient).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/ingredients/1");
    expect(store.state.ingredient.ingredient).toEqual("test");
    expect(store.state.ingredient.isLoadingIngredient).toBe(false);
  });

  it("Should show error notification on failed loadIngredient action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredient/loadIngredient", 1)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful createIngredient action dispatch", async () => {
    const ingredient = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    store.dispatch("ingredient/createIngredient", ingredient);
    expect(store.state.ingredient.isSubmittingIngredient).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "service/ingredients",
      ingredient
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.ingredient.isSubmittingIngredient).toBe(false);
  });

  it("Should show error notification on failed createIngredient action dispatch", async () => {
    const ingredient = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredient/createIngredient", ingredient)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful updateIngredient action dispatch", async () => {
    const ingredient = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch("ingredient/updateIngredient", ingredient);
    expect(store.state.ingredient.isSubmittingIngredient).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith(
      "service/ingredients/1",
      ingredient
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.ingredient.isSubmittingIngredient).toBe(false);
  });

  it("Should show error notification on failed updateIngredient action dispatch", async () => {
    const ingredient = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredient/updateIngredient", ingredient)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });
});
