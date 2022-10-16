import ApiService from "@/services/api.service";
import { RecipeState, RecipesList } from "@/types/recipe";
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
  getRecipesList: (state): RecipesList | null => state.recipesList,
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
      commit("setIsLoadingRecipesList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/recipes" + getListQuery(filters)
      )
        .then((response: AxiosResponse<RecipesList>) => {
          const list = helpers.fixRecipesListDates(response.data);
          commit("setIsLoadingRecipesList", false);
          commit("setRecipesList", list);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("setIsLoadingRecipesList", false);
          reject(errorMessage);
        });
    });
  },

  loadRecipesTags({ commit }, filters: ListBaseFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingRecipesTags", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/tags" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<{ recipesTags: string }>) => {
          commit("setIsLoadingRecipesTags", false);
          commit("setRecipesTags", response.data.recipesTags);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("setIsLoadingRecipesTags", false);
          reject(errorMessage);
        });
    });
  },

  loadRecipesSearchSuggestions({ commit }, filters: ListBaseFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingRecipesSearchSuggestions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/suggestions" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          commit("setIsLoadingRecipesSearchSuggestions", false);
          commit("setRecipesSearchSuggestions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("setIsLoadingRecipesSearchSuggestions", false);
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
  setRecipesList(state, list: RecipesList) {
    state.recipesList = list;
  },

  setIsLoadingRecipesList(state, value) {
    state.isLoadingRecipesList = value;
  },

  setRecipesTags(state, tags: string) {
    state.recipesTags = tags;
  },

  setIsLoadingRecipesTags(state, value) {
    state.isLoadingRecipesTags = value;
  },

  setRecipesSearchSuggestions(state, suggestions: string[]) {
    state.recipesSearchSuggestions = suggestions;
  },

  setIsLoadingRecipesSearchSuggestions(state, value) {
    state.isLoadingRecipesSearchSuggestions = value;
  },
};

const helpers = {
  fixRecipesListDates: (recipesList: RecipesList) => {
    recipesList.data.forEach((recipe) => {
      recipe.cookedDate = new Date(recipe.cookedDate);

      recipe.cookedDatesInCurrentMonth = recipe.cookedDatesInCurrentMonth.map(
        (date) => {
          return new Date(date);
        }
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
};
