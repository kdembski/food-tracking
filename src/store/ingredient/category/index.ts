import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { ListFilters } from "@/types/components/list";
import {
  IngredientCategory,
  IngredientCategoryOption,
  IngredientCategoriesList,
  IngredientCategoryState,
} from "@/types/ingredients/category";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "@/store/helpers/error-message";
import { getListQuery } from "@/store/helpers/list-query";

const state: IngredientCategoryState = {
  single: null,
  isLoading: false,
  isSubmitting: false,

  list: null,
  isLoadingList: false,

  options: null,
  isLoadingOptions: false,
};

const getters: GetterTree<IngredientCategoryState, any> = {
  list: (state): IngredientCategoriesList | null => state.list,
  isLoadingList: (state) => state.isLoadingList,

  options: (state) =>
    state.options?.map((option) => ({
      value: option.id,
      label: option.name,
    })),
};

const actions: ActionTree<IngredientCategoryState, any> = {
  loadList({ commit, rootState }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients" + getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientCategoriesList>) => {
          commit("setIsLoadingList", false);
          commit("setList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingList", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadOptions({ commit, rootState }) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingOptions", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/ingredients/options")
        .then((response: AxiosResponse<IngredientCategoryOption[]>) => {
          commit("setIsLoadingOptions", false);
          commit("setOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingOptions", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  load({ commit, rootState }, ingredientId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoading", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + ingredientId
      )
        .then((response: AxiosResponse<IngredientCategory>) => {
          commit("setIsLoading", false);
          commit("setSingle", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoading", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  create({ commit, rootState }, ingredient: IngredientCategory) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/ingredients",
        ingredient
      )
        .then(() => {
          rootState.toastNotification.success("Dodano składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  update({ commit, rootState }, ingredient: IngredientCategory) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + ingredient.id,
        ingredient
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  delete({ commit, rootState }, ingredientId: number) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + ingredientId
      )
        .then(() => {
          rootState.toastNotification.success("Usunięto składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<IngredientCategoryState> = {
  setList(state, list: IngredientCategoriesList) {
    state.list = list;
  },

  setIsLoadingList(state, value) {
    state.isLoadingList = value;
  },

  setOptions(state, list: IngredientCategoryOption[]) {
    state.options = list;
  },

  setIsLoadingOptions(state, value) {
    state.isLoadingOptions = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setSingle(state, ingredient: IngredientCategory) {
    state.single = ingredient;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
