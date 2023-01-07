import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import ingredientCategory from "@/store/ingredient/category/index";
import {
  IngredientCategoriesList,
  IngredientCategoryOption,
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
  let ingredientCategoriesList: IngredientCategoriesList;
  let ingredientCategoryOptions: IngredientCategoryOption[];
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

    ingredientCategoriesList = {
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

    ingredientCategoryOptions = [
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
        ingredientCategory,
      },
    });
  });

  it("Should set ingredientCategories list to state on successful loadIngredientCategoriesList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: ingredientCategoriesList })
    );
    store.dispatch(
      "ingredientCategory/loadIngredientCategoriesList",
      listFilters
    );
    expect(
      store.getters["ingredientCategory/isLoadingIngredientCategoriesList"]
    ).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories?page=1&size=10&searchPhrase=test&sortAttribute=attr&sortDirection=dir&tags=tag"
    );
    expect(
      store.getters["ingredientCategory/ingredientCategoriesList"]
    ).toEqual(ingredientCategoriesList);
    expect(
      store.getters["ingredientCategory/isLoadingIngredientCategoriesList"]
    ).toBe(false);
  });

  it("Should show error notification on failed loadIngredientCategoriesList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch(
        "ingredientCategory/loadIngredientCategoriesList",
        listFilters
      )
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ingredientCategoryOptions to state on successful loadIngredientCategoryOptions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: ingredientCategoryOptions })
    );
    store.dispatch("ingredientCategory/loadIngredientCategoryOptions");
    expect(
      store.state.ingredientCategory.isLoadingIngredientCategoryOptions
    ).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories/options"
    );
    expect(store.state.ingredientCategory.ingredientCategoryOptions).toEqual(
      ingredientCategoryOptions
    );
    expect(
      store.state.ingredientCategory.isLoadingIngredientCategoryOptions
    ).toBe(false);
    expect(
      store.getters["ingredientCategory/ingredientCategoryOptions"]
    ).toEqual([
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

  it("Should show error notification on failed loadIngredientCategoryOptions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientCategory/loadIngredientCategoryOptions")
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ingredientCategory to state on successful loadIngredientCategory action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("ingredientCategory/loadIngredientCategory", 1);
    expect(store.state.ingredientCategory.isLoadingIngredientCategory).toBe(
      true
    );
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories/1"
    );
    expect(store.state.ingredientCategory.ingredientCategory).toEqual("test");
    expect(store.state.ingredientCategory.isLoadingIngredientCategory).toBe(
      false
    );
  });

  it("Should show error notification on failed loadIngredientCategory action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientCategory/loadIngredientCategory", 1)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful createIngredientCategory action dispatch", async () => {
    const ingredientCategory = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    store.dispatch(
      "ingredientCategory/createIngredientCategory",
      ingredientCategory
    );
    expect(store.state.ingredientCategory.isSubmittingIngredientCategory).toBe(
      true
    );
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "service/ingredients/categories",
      ingredientCategory
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.ingredientCategory.isSubmittingIngredientCategory).toBe(
      false
    );
  });

  it("Should show error notification on failed createIngredientCategory action dispatch", async () => {
    const ingredientCategory = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch(
        "ingredientCategory/createIngredientCategory",
        ingredientCategory
      )
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful updateIngredientCategory action dispatch", async () => {
    const ingredientCategory = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch(
      "ingredientCategory/updateIngredientCategory",
      ingredientCategory
    );
    expect(store.state.ingredientCategory.isSubmittingIngredientCategory).toBe(
      true
    );
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith(
      "service/ingredients/categories/1",
      ingredientCategory
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.ingredientCategory.isSubmittingIngredientCategory).toBe(
      false
    );
  });

  it("Should show error notification on failed updateIngredientCategory action dispatch", async () => {
    const ingredientCategory = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch(
        "ingredientCategory/updateIngredientCategory",
        ingredientCategory
      )
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });
});
