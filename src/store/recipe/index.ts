import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import { RecipeState, RecipeList } from "@/types/recipe";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/list";
import { getAvailableTagsQuery, TagsFilters } from "../helpers/tags-query";

const state: RecipeState = {
  recipesList: null,
  isLoadingRecipesList: false,
};

const getters: GetterTree<RecipeState, any> = {
  getRecipesList: (state: RecipeState) => state.recipesList,
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

  getAvailableRecipesTags(_, filters: TagsFilters) {
    return new Promise<string>((resolve, reject) => {
      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/tags" +
          getAvailableTagsQuery(filters)
      )
        .then((response: AxiosResponse<{ recipesTags: string }>) => {
          resolve(response.data.recipesTags);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
