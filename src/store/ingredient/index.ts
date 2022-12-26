import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/components/list";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "../helpers/error-message";
import {
  Ingredient,
  IngredientsList,
  IngredientState,
} from "@/types/ingredients/ingredient";

const state: IngredientState = {
  ingredient: null,
  isLoadingIngredient: false,
  isSubmittingIngredient: false,

  ingredientsList: null,
  isLoadingIngredientsList: false,
};

const getters: GetterTree<IngredientState, any> = {
  ingredientsList: (state): IngredientsList | null => state.ingredientsList,
  isLoadingIngredientsList: (state) => state.isLoadingIngredientsList,
};

const actions: ActionTree<IngredientState, any> = {
  loadIngredientsList({ commit, rootState }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientsList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients" + getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientsList>) => {
          commit("setIsLoadingIngredientsList", false);
          commit("setIngredientsList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientsList", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadIngredient({ commit, rootState }, ingredientId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredient", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + ingredientId
      )
        .then((response: AxiosResponse<Ingredient>) => {
          commit("setIsLoadingIngredient", false);
          commit("setIngredient", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredient", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  createIngredient({ commit, rootState }, ingredient: Ingredient) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingIngredient", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/ingredients",
        ingredient
      )
        .then(() => {
          rootState.toastNotification.success("Dodano składnik.");
          commit("setIsSubmittingIngredient", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingIngredient", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  updateIngredient({ commit, rootState }, ingredient: Ingredient) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingIngredient", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + ingredient.id,
        ingredient
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano składnik.");
          commit("setIsSubmittingIngredient", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingIngredient", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<IngredientState> = {
  setIngredientsList(state, list: IngredientsList) {
    state.ingredientsList = list;
  },

  setIsLoadingIngredientsList(state, value) {
    state.isLoadingIngredientsList = value;
  },

  setIsSubmittingIngredient(state, value) {
    state.isSubmittingIngredient = value;
  },

  setIngredient(state, ingredient: Ingredient) {
    state.ingredient = ingredient;
  },

  setIsLoadingIngredient(state, value) {
    state.isLoadingIngredient = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
