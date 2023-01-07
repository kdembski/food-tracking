import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import ingredientUnit from "@/store/ingredient/unit/index";
import {
  IngredientUnitsList,
  IngredientUnitOption,
} from "@/types/ingredients/unit";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Ingredient Unit Store Module", () => {
  let store: any;
  let toastNotification: any;
  let ingredientUnitsList: IngredientUnitsList;
  let ingredientUnitOptions: IngredientUnitOption[];
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

    ingredientUnitsList = {
      data: [
        {
          id: 1,
          name: "name 1",
          shortcut: "shortcut 1",
        },
        {
          id: 2,
          name: "name 2",
          shortcut: "shortcut 2",
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

    ingredientUnitOptions = [
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
        ingredientUnit,
      },
    });
  });

  it("Should set ingredientUnits list to state on successful loadIngredientUnitsList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: ingredientUnitsList })
    );
    store.dispatch("ingredientUnit/loadIngredientUnitsList", listFilters);
    expect(store.getters["ingredientUnit/isLoadingIngredientUnitsList"]).toBe(
      true
    );
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories?page=1&size=10&searchPhrase=test&sortAttribute=attr&sortDirection=dir&tags=tag"
    );
    expect(store.getters["ingredientUnit/ingredientUnitsList"]).toEqual(
      ingredientUnitsList
    );
    expect(store.getters["ingredientUnit/isLoadingIngredientUnitsList"]).toBe(
      false
    );
  });

  it("Should show error notification on failed loadIngredientUnitsList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientUnit/loadIngredientUnitsList", listFilters)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ingredientUnitOptions to state on successful loadIngredientUnitOptions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: ingredientUnitOptions })
    );
    store.dispatch("ingredientUnit/loadIngredientUnitOptions");
    expect(store.state.ingredientUnit.isLoadingIngredientUnitOptions).toBe(
      true
    );
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories/options"
    );
    expect(store.state.ingredientUnit.ingredientUnitOptions).toEqual(
      ingredientUnitOptions
    );
    expect(store.state.ingredientUnit.isLoadingIngredientUnitOptions).toBe(
      false
    );
    expect(store.getters["ingredientUnit/ingredientUnitOptions"]).toEqual([
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

  it("Should show error notification on failed loadIngredientUnitOptions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientUnit/loadIngredientUnitOptions")
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set ingredientUnit to state on successful loadIngredientUnit action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("ingredientUnit/loadIngredientUnit", 1);
    expect(store.state.ingredientUnit.isLoadingIngredientUnit).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/ingredients/categories/1"
    );
    expect(store.state.ingredientUnit.ingredientUnit).toEqual("test");
    expect(store.state.ingredientUnit.isLoadingIngredientUnit).toBe(false);
  });

  it("Should show error notification on failed loadIngredientUnit action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientUnit/loadIngredientUnit", 1)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful createIngredientUnit action dispatch", async () => {
    const ingredientUnit = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    store.dispatch("ingredientUnit/createIngredientUnit", ingredientUnit);
    expect(store.state.ingredientUnit.isSubmittingIngredientUnit).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "service/ingredients/categories",
      ingredientUnit
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.ingredientUnit.isSubmittingIngredientUnit).toBe(false);
  });

  it("Should show error notification on failed createIngredientUnit action dispatch", async () => {
    const ingredientUnit = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientUnit/createIngredientUnit", ingredientUnit)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful updateIngredientUnit action dispatch", async () => {
    const ingredientUnit = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch("ingredientUnit/updateIngredientUnit", ingredientUnit);
    expect(store.state.ingredientUnit.isSubmittingIngredientUnit).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith(
      "service/ingredients/categories/1",
      ingredientUnit
    );
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.ingredientUnit.isSubmittingIngredientUnit).toBe(false);
  });

  it("Should show error notification on failed updateIngredientUnit action dispatch", async () => {
    const ingredientUnit = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("ingredientUnit/updateIngredientUnit", ingredientUnit)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });
});
