import { RecipesList } from "@/types/recipe";
import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import recipe from "@/store/recipe/index";
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
  let recipesList: RecipesList;
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

    recipesList = {
      data: [
        {
          id: 1,
          recipeName: "name 1",
          preparationTime: 1,
          tags: "tag1,tag2",
          cookidooLink: "link 1",
          cookedDate: new Date(2000, 1, 1),
          cookedDatesInCurrentMonth: [new Date(2000, 1, 1)],
        },
        {
          id: 2,
          recipeName: "name 2",
          preparationTime: 2,
          tags: "tag1,tag2",
          cookidooLink: "link 2",
          cookedDate: new Date(2000, 1, 2),
          cookedDatesInCurrentMonth: [new Date(2000, 1, 2)],
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
        recipe,
      },
    });
  });

  it("Should set recipes list to state on successful loadRecipesList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: recipesList })
    );
    store.dispatch("recipe/loadRecipesList", listFilters);
    expect(store.getters["recipe/isLoadingRecipesList"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/recipes?page=1&size=10&search=test&attr=attr&dir=dir&tags=tag"
    );
    expect(store.getters["recipe/recipesList"]).toEqual(recipesList);
    expect(store.getters["recipe/isLoadingRecipesList"]).toBe(false);
  });

  it("Should show error notification on failed loadRecipesList action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("recipe/loadRecipesList", listFilters)
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set recipes tags to state on successful loadRecipesTags action dispatch", async () => {
    const filters = {
      searchPhrase: "test",
      tags: "tag",
    };
    const tags = "tag1,tag2";

    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: { recipesTags: tags } })
    );
    store.dispatch("recipe/loadRecipesTags", filters);
    expect(store.getters["recipe/isLoadingRecipesTags"]).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/recipes/tags?search=test&tags=tag"
    );
    expect(store.getters["recipe/recipesTags"]).toEqual(tags);
    expect(store.getters["recipe/isLoadingRecipesTags"]).toBe(false);
  });

  it("Should show error notification on failed loadRecipesTags action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("recipe/loadRecipesTags")).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set recipes suggestions to state on successful loadRecipesSearchSuggestions action dispatch", async () => {
    const filters = {
      searchPhrase: "test",
      tags: "tag",
    };
    const suggestions = ["test"];

    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: ["test"] }));
    store.dispatch("recipe/loadRecipesSearchSuggestions", filters);
    expect(store.getters["recipe/isLoadingRecipesSearchSuggestions"]).toBe(
      true
    );
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      "service/recipes/suggestions?search=test&tags=tag"
    );
    expect(store.state.recipe.recipesSearchSuggestions).toEqual(suggestions);
    expect(store.getters["recipe/isLoadingRecipesSearchSuggestions"]).toBe(
      false
    );
  });

  it("Should show error notification on failed loadRecipesSearchSuggestions action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(
      store.dispatch("recipe/loadRecipesSearchSuggestions")
    ).rejects.toEqual("error");
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should return recipes count on successful getRecipesListCount action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: 30 }));
    await expect(store.dispatch("recipe/getRecipesListCount")).resolves.toEqual(
      30
    );
    await flushPromises();
    expect(mockAxiosGet).toHaveBeenCalledWith("service/recipes/count");
  });

  it("Should show error notification on failed getRecipesListCount action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("recipe/getRecipesListCount")).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should set recipe to state on successful loadRecipe action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: "test" }));
    store.dispatch("recipe/loadRecipe", 1);
    expect(store.state.recipe.isLoadingRecipe).toBe(true);
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/recipes/1");
    expect(store.state.recipe.recipe).toEqual("test");
    expect(store.state.recipe.isLoadingRecipe).toBe(false);
  });

  it("Should show error notification on failed loadRecipe action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("recipe/loadRecipe", 1)).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful createRecipe action dispatch", async () => {
    const recipe = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.resolve());
    store.dispatch("recipe/createRecipe", recipe);
    expect(store.state.recipe.isSubmittingRecipe).toBe(true);
    await flushPromises();

    expect(mockAxiosPost).toHaveBeenCalledWith("service/recipes", recipe);
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.recipe.isSubmittingRecipe).toBe(false);
  });

  it("Should show error notification on failed createRecipe action dispatch", async () => {
    const recipe = { id: 1 };
    mockAxiosPost.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("recipe/createRecipe", recipe)).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should show success notification on successful updateRecipe action dispatch", async () => {
    const recipe = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.resolve());
    store.dispatch("recipe/updateRecipe", recipe);
    expect(store.state.recipe.isSubmittingRecipe).toBe(true);
    await flushPromises();

    expect(mockAxiosPut).toHaveBeenCalledWith("service/recipes/1", recipe);
    expect(toastNotification.success).toHaveBeenCalledTimes(1);
    expect(store.state.recipe.isSubmittingRecipe).toBe(false);
  });

  it("Should show error notification on failed updateRecipe action dispatch", async () => {
    const recipe = { id: 1 };
    mockAxiosPut.mockImplementation(() => Promise.reject({ code: "error" }));
    await expect(store.dispatch("recipe/updateRecipe", recipe)).rejects.toEqual(
      "error"
    );
    await flushPromises();
    expect(toastNotification.error).toHaveBeenCalledTimes(1);
  });

  it("Should return search suggestion options from getRecipesSearchSuggestions getter", async () => {
    await store.commit("recipe/setRecipesSearchSuggestions", null);
    expect(store.getters["recipe/recipesSearchSuggestions"]).toEqual([]);
    await store.commit("recipe/setRecipesSearchSuggestions", [
      "test1",
      "test2",
    ]);
    expect(store.getters["recipe/recipesSearchSuggestions"]).toEqual([
      { value: null, label: "test1" },
      { value: null, label: "test2" },
    ]);
  });
});
