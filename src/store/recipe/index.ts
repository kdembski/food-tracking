import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import { RecipeState, Recipe } from "@/types/recipe";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/composables/list";

const state: RecipeState = {
  recipesList: null,
  isLoadingRecipesList: false,
};

const getters: GetterTree<RecipeState, any> = {
  getRecipesList: (state: RecipeState) => state.recipesList,
};

const actions: ActionTree<RecipeState, any> = {
  loadRecipesList(
    { commit }: ActionContext<RecipeState, any>,
    filters: ListFilters
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("loadRecipesListRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/recipes" + getListQuery(filters)
      )
        .then((response: AxiosResponse<Array<Recipe>>) => {
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
};

const mutations: MutationTree<RecipeState> = {
  loadRecipesListRequest(state: RecipeState) {
    state.isLoadingRecipesList = true;
  },

  loadRecipesListSuccess(state: RecipeState, listData: Array<Recipe>) {
    state.recipesList = listData;
    state.isLoadingRecipesList = false;
  },

  loadRecipesListError(state: RecipeState) {
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
