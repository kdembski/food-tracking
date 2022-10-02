import ApiService from "@/services/api.service";
import { RecipeState, RecipeList } from "@/types/recipe";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery, getListBaseQuery } from "../helpers/list-query";
import { ListFilters, ListBaseFilters } from "@/types/list";
import { DropdownOption } from "@/components/utils/dropdown/types/option";

const state: RecipeState = {
  recipesList: null,
  isLoadingRecipesList: false,

  recipesTags: null,
  isLoadingRecipesTags: false,

  recipesSearchSuggestions: null,
  isLoadingRecipesSearchSuggestions: false,
};

const getters: GetterTree<RecipeState, any> = {
  getRecipesList: (state): RecipeList | null => state.recipesList,
  isLoadingRecipesList: (state) => state.isLoadingRecipesList,

  getRecipesTags: (state): string | null => state.recipesTags,
  isLoadingRecipesTags: (state) => state.isLoadingRecipesTags,

  getRecipesSearchSuggestions: (state): DropdownOption<null>[] => {
    const suggestions = state.recipesSearchSuggestions;
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

  isLoadingRecipesSearchSuggestions: (state) =>
    state.isLoadingRecipesSearchSuggestions,
};

const actions: ActionTree<RecipeState, any> = {
  loadRecipesList({ commit }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadRecipesListRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/recipes" + getListQuery(filters)
      )
        .then((response: AxiosResponse<RecipeList>) => {
          commit("loadRecipesListSuccess", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("loadRecipesListError", errorMessage);
          reject(errorMessage);
        });
    });
  },

  loadRecipesTags({ commit }, filters: ListBaseFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadRecipesTagsRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/tags" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<{ recipesTags: string }>) => {
          commit("loadRecipesTagsSuccess", response.data.recipesTags);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("loadRecipesTagsError", errorMessage);
          reject(errorMessage);
        });
    });
  },

  loadRecipesSearchSuggestions({ commit }, filters: ListBaseFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadRecipesSearchSuggestionsRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/suggestions" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          commit("loadRecipesSearchSuggestionsSuccess", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("loadRecipesSearchSuggestionsError", errorMessage);
          reject(errorMessage);
        });
    });
  },

  getRecipesListCount({ commit }) {
    return new Promise<number>((resolve, reject) => {
      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/recipes/count")
        .then((response: AxiosResponse<number>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;
          reject(errorMessage);
        });
    });
  },
};

const mutations: MutationTree<RecipeState> = {
  loadRecipesListRequest(state) {
    state.isLoadingRecipesList = true;
  },

  loadRecipesListSuccess(state, list: RecipeList) {
    state.recipesList = list;
    state.isLoadingRecipesList = false;
  },

  loadRecipesListError(state) {
    state.isLoadingRecipesList = false;
  },

  loadRecipesTagsRequest(state) {
    state.isLoadingRecipesTags = true;
  },

  loadRecipesTagsSuccess(state, tags: string) {
    state.recipesTags = tags;
    state.isLoadingRecipesTags = false;
  },

  loadRecipesTagsError(state) {
    state.isLoadingRecipesTags = false;
  },

  loadRecipesSearchSuggestionsRequest(state) {
    state.isLoadingRecipesSearchSuggestions = true;
  },

  loadRecipesSearchSuggestionsSuccess(state, suggestions: string[]) {
    state.recipesSearchSuggestions = suggestions;
    state.isLoadingRecipesSearchSuggestions = false;
  },

  loadRecipesSearchSuggestionsError(state) {
    state.isLoadingRecipesSearchSuggestions = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
