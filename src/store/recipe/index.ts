import ApiService from "@/services/api.service";
import {
  RecipeState,
  RecipesList,
  Recipe,
  RecipeErrors,
  RecipeOption,
  RecipesFilters,
} from "@/types/recipes/recipe";
import { ApiError, DbResults } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getCustomFiltersQuery, getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/components/data-display/list";
import { DropdownOption } from "@/types/components/utils/dropdown";
import { Tag } from "@/types/components/utils/tags";
import ingredient from "./ingredient";

const state: () => RecipeState = () => ({
  single: null,
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,

  list: null,
  isLoadingList: false,

  tags: null,
  isLoadingTags: false,

  searchSuggestions: null,
  isLoadingSearchSuggestions: false,

  options: null,
  isLoadingOptions: false,

  errors: null,

  isAddingToShoppingList: false,
});

const getters: GetterTree<RecipeState, any> = {
  list: (state) => state.list,
  isLoadingList: (state) => state.isLoadingList,

  tags: (state) => state.tags,
  isLoadingTags: (state) => state.isLoadingTags,

  searchSuggestions: (state): DropdownOption<null>[] => {
    const suggestions = state.searchSuggestions;
    if (!suggestions) {
      return [];
    }
    return suggestions.map((item: string) => {
      return {
        value: null,
        label: item,
      };
    });
  },

  isLoadingSearchSuggestions: (state) => state.isLoadingSearchSuggestions,
  errors: (state) => state.errors,

  getNameById: (state) => (id: number) =>
    state.options?.find((options) => options.id === id)?.recipeName,
};

const actions: ActionTree<RecipeState, any> = {
  loadList({ commit, dispatch }, filters: ListFilters<RecipesFilters>) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/recipes" + getListQuery(filters)
      )
        .then((response: AxiosResponse<RecipesList>) => {
          const list = helpers.fixListDates(response.data);
          commit("setList", list);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingList", false);
        });
    });
  },

  loadTags({ commit, dispatch }, filters: ListFilters<RecipesFilters>) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingTags", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/tags" +
          getCustomFiltersQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          commit("setTags", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingTags", false);
        });
    });
  },

  loadSearchSuggestions(
    { commit, dispatch },
    filters: ListFilters<RecipesFilters>
  ) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingSearchSuggestions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/suggestions" +
          getCustomFiltersQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          commit("setSearchSuggestions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingSearchSuggestions", false);
        });
    });
  },

  loadOptions({ commit, dispatch, state }) {
    if (state.options) {
      return;
    }

    return new Promise<void>((resolve) => {
      commit("setIsLoadingOptions", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/recipes/options")
        .then((response: AxiosResponse<RecipeOption[]>) => {
          commit("setOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingOptions", false);
        });
    });
  },

  getCount({ dispatch }) {
    return new Promise<number>((resolve) => {
      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/recipes/count")
        .then((response: AxiosResponse<number>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  load({ commit, dispatch }, itemId) {
    return new Promise<void>((resolve) => {
      commit("setIsLoading", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/recipes/" + itemId)
        .then((response: AxiosResponse<Recipe>) => {
          const recipe = response.data;
          if (recipe?.cookedDate) {
            recipe.cookedDate = new Date(recipe.cookedDate);
          }

          commit("setSingle", recipe);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    });
  },

  create({ commit, dispatch, rootState }, item: Recipe) {
    return new Promise<number>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/recipes", item)
        .then((response: AxiosResponse<DbResults>) => {
          rootState.toastNotification.success("Dodano przepis.");
          resolve(response.data.insertId);
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch(
            "handleComplexError",
            { error, module: "recipe" },
            { root: true }
          );
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  update({ commit, dispatch, rootState }, item: Recipe) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/recipes/" + item.id,
        item
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano przepis.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch(
            "handleComplexError",
            { error, module: "recipe" },
            { root: true }
          );
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve) => {
      commit("setIsDeleting", true);

      ApiService.delete(process.env.VUE_APP_SERVICE_URL + "/recipes/" + itemId)
        .then(() => {
          rootState.toastNotification.success("Usunięto przepis.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsDeleting", false);
        });
    });
  },

  addToShoppingList({ commit, dispatch, rootState }, data) {
    return new Promise<void>((resolve) => {
      commit("setIsAddingToShoppingList", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/recipes",
        data
      )
        .then(() => {
          rootState.toastNotification.success(
            "Dodano przepis do listy zakupów."
          );
          dispatch("shopping/list/sendWebSocketMessage", true, { root: true });
          dispatch(
            "shopping/item/sendWebSocketMessage",
            { returnToSender: true, listId: data.shoppingListId },
            { root: true }
          );

          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsAddingToShoppingList", false);
        });
    });
  },
};

const mutations: MutationTree<RecipeState> = {
  setList(state, list: RecipesList) {
    state.list = list;
  },

  setIsLoadingList(state, value) {
    state.isLoadingList = value;
  },

  setTags(state, tags: Tag[]) {
    state.tags = tags;
  },

  setIsLoadingTags(state, value) {
    state.isLoadingTags = value;
  },

  setSearchSuggestions(state, suggestions: string[]) {
    state.searchSuggestions = suggestions;
  },

  setIsLoadingSearchSuggestions(state, value) {
    state.isLoadingSearchSuggestions = value;
  },

  setOptions(state, options: RecipeOption[]) {
    state.options = options;
  },

  setIsLoadingOptions(state, value) {
    state.isLoadingOptions = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setIsDeleting(state, value) {
    state.isDeleting = value;
  },

  setSingle(state, recipe: Recipe) {
    state.single = recipe;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },

  setErrors(state, value: RecipeErrors) {
    state.errors = value;
  },

  setIsAddingToShoppingList(state, value: boolean) {
    state.isAddingToShoppingList = value;
  },
};

const helpers = {
  fixListDates: (recipesList: RecipesList) => {
    recipesList.data.forEach((recipe) => {
      if (recipe.cookedDate) {
        recipe.cookedDate = new Date(recipe.cookedDate);
      }

      recipe.datesFromLastYear = recipe.datesFromLastYear.map((month) =>
        month.map((date) => new Date(date))
      );
    });

    return recipesList;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    ingredient,
  },
};
