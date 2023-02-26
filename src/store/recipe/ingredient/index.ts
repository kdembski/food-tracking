import { RecipeIngredient } from "./../../../types/recipes/recipeIngredient";
import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { RecipeIngredientState } from "@/types/recipes/recipeIngredient";

const state: RecipeIngredientState = {
  collection: null,
  isLoadingCollection: false,
  isSubmittingCollection: false,
};

const getters: GetterTree<RecipeIngredientState, any> = {};

const actions: ActionTree<RecipeIngredientState, any> = {
  loadCollection({ commit, dispatch }, recipeId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingCollection", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/" +
          recipeId +
          "/ingredients"
      )
        .then((response: AxiosResponse<RecipeIngredient[]>) => {
          commit("setIsLoadingCollection", false);
          commit("setCollection", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingCollection", false);
          dispatch("handleDefaultError", error, { root: true });
          reject(error);
        });
    });
  },

  createCollection(
    { commit, dispatch, rootState },
    {
      collection,
      recipeId,
    }: { collection: RecipeIngredient[]; recipeId: number }
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingCollection", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/" +
          recipeId +
          "/ingredients",
        collection
      )
        .then(() => {
          commit("setIsSubmittingCollection", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingCollection", false);
          dispatch(
            "handleComplexError",
            { error, module: "recipe/ingredient" },
            { root: true }
          );
          reject(error);
        });
    });
  },

  updateCollection(
    { commit, dispatch, rootState },
    {
      collection,
      recipeId,
    }: { collection: RecipeIngredient[]; recipeId: number }
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingCollection", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/" +
          recipeId +
          "/ingredients",
        collection
      )
        .then(() => {
          commit("setIsSubmittingCollection", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingCollection", false);
          dispatch(
            "handleComplexError",
            { error, module: "recipe/ingredient" },
            { root: true }
          );
          reject(error);
        });
    });
  },
};

const mutations: MutationTree<RecipeIngredientState> = {
  setIsSubmittingCollection(state, value) {
    state.isSubmittingCollection = value;
  },

  setCollection(state, collection: RecipeIngredient[]) {
    state.collection = collection;
  },

  setIsLoadingCollection(state, value) {
    state.isLoadingCollection = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
