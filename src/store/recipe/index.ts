import ApiService from "@/services/api.service";
import { RecipeState, RecipeList } from "@/types/recipe";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/list";
import { getAvailableTagsQuery, TagsFilters } from "../helpers/tags-query";

const state: RecipeState = {
  recipesList: null,
  isLoadingRecipesList: false,
  recipesTags: null,
  isLoadingRecipesTags: false,
};

const getters: GetterTree<RecipeState, any> = {
  getRecipesList: (state): RecipeList | null => state.recipesList,
  isLoadingRecipesList: (state) => state.isLoadingRecipesList,

  getRecipesTags: (state): RecipeList | null => state.recipesTags,
  isLoadingRecipesTags: (state) => state.isLoadingRecipesTags,
};

const actions: ActionTree<RecipeState, any> = {
  loadRecipesList({ commit }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadRecipesListRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/recipes" + getListQuery(filters)
      )
        .then((response: AxiosResponse<RecipeList>) => {
          setTimeout(() => {
            commit("loadRecipesListSuccess", response.data);
            resolve();
          }, 100);
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("loadRecipesListError", errorMessage);
          reject(errorMessage);
        });
    });
  },

  loadRecipesTags({ commit }, filters: TagsFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadRecipesTagsRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/tags" +
          getAvailableTagsQuery(filters)
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

  loadRecipesTagsSuccess(state, list: RecipeList) {
    state.recipesTags = list;
    state.isLoadingRecipesTags = false;
  },

  loadRecipesTagsError(state) {
    state.isLoadingRecipesTags = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
