import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import { RecipeState, Recipe } from "@/types/recipe";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { ListFilters, getListQuery } from "../helpers/list-query";

const state: RecipeState = {
  recipesList: null,
  isLoadingRecipesList: false,
};

const getters: GetterTree<RecipeState, any> = {
  getRecipesList: (state: RecipeState) => state.recipesList,
};

const actions: ActionTree<RecipeState, any> = {
  getRecipesList(
    { commit }: ActionContext<RecipeState, any>,
    filters: ListFilters
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("getRecipesListRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/recipes" + getListQuery(filters)
      )
        .then((response: AxiosResponse<Array<Recipe>>) => {
          commit("getRecipesListSuccess", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("getRecipesListError", errorMessage);
          reject(errorMessage);
        });
    });
  },
};

const mutations: MutationTree<RecipeState> = {
  getRecipesListRequest(state: RecipeState) {
    state.isLoadingRecipesList = true;
  },

  getRecipesListSuccess(state: RecipeState, listData: Array<Recipe>) {
    state.recipesList = listData;
    state.isLoadingRecipesList = false;
  },

  getRecipesListError(state: RecipeState) {
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
