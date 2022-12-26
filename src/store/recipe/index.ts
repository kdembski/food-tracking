import ApiService from "@/services/api.service";
import { RecipeState, RecipesList, Recipe } from "@/types/recipes/recipe";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery, getListBaseQuery } from "../helpers/list-query";
import { ListFilters, ListBaseFilters } from "@/types/components/list";
import { DropdownOption } from "@/types/components/dropdown";
import { Tag } from "@/types/components/tags";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "../helpers/error-message";

const state: RecipeState = {
  recipe: null,
  isLoadingRecipe: false,

  recipesList: null,
  isLoadingRecipesList: false,

  recipesTags: null,
  isLoadingRecipesTags: false,

  recipesSearchSuggestions: null,
  isLoadingRecipesSearchSuggestions: false,

  isSubmittingRecipe: false,
};

const getters: GetterTree<RecipeState, any> = {
  recipesList: (state): RecipesList | null => state.recipesList,
  isLoadingRecipesList: (state) => state.isLoadingRecipesList,

  recipesTags: (state): Tag[] | null => state.recipesTags,
  isLoadingRecipesTags: (state) => state.isLoadingRecipesTags,

  recipesSearchSuggestions: (state): DropdownOption<null>[] => {
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
  loadRecipesList({ commit, rootState }, filters: ListFilters) {
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
          commit("setIsLoadingRecipesList", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadRecipesTags({ commit, rootState }, filters: ListBaseFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingRecipesTags", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/tags" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          commit("setIsLoadingRecipesTags", false);
          commit("setRecipesTags", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingRecipesTags", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadRecipesSearchSuggestions(
    { commit, rootState },
    filters: ListBaseFilters
  ) {
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
          commit("setIsLoadingRecipesSearchSuggestions", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  getRecipesListCount({ rootState }) {
    return new Promise<number>((resolve, reject) => {
      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/recipes/count")
        .then((response: AxiosResponse<number>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError<ApiError>) => {
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadRecipe({ commit, rootState }, recipeId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingRecipe", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/recipes/" + recipeId)
        .then((response: AxiosResponse<Recipe>) => {
          commit("setIsLoadingRecipe", false);
          commit("setRecipe", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingRecipe", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  createRecipe({ commit, rootState }, recipe: Recipe) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingRecipe", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/recipes", recipe)
        .then(() => {
          rootState.toastNotification.success("Dodano przepis.");
          commit("setIsSubmittingRecipe", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingRecipe", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  updateRecipe({ commit, rootState }, recipe: Recipe) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingRecipe", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/recipes/" + recipe.id,
        recipe
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano przepis.");
          commit("setIsSubmittingRecipe", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingRecipe", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
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

  setRecipesTags(state, tags: Tag[]) {
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

  setIsSubmittingRecipe(state, value) {
    state.isSubmittingRecipe = value;
  },

  setRecipe(state, recipe: Recipe) {
    state.recipe = recipe;
  },

  setIsLoadingRecipe(state, value) {
    state.isLoadingRecipe = value;
  },
};

const helpers = {
  fixRecipesListDates: (recipesList: RecipesList) => {
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
};
