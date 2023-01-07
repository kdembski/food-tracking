import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { ListFilters } from "@/types/components/list";
import {
  IngredientCategoriesList,
  IngredientCategory,
  IngredientCategoryOption,
  IngredientCategoryState,
} from "@/types/ingredients/category";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "@/store/helpers/error-message";
import { getListQuery } from "@/store/helpers/list-query";

const state: IngredientCategoryState = {
  ingredientCategory: null,
  isLoadingIngredientCategory: false,
  isSubmittingIngredientCategory: false,

  ingredientCategoriesList: null,
  isLoadingIngredientCategoriesList: false,

  ingredientCategoryOptions: null,
  isLoadingIngredientCategoryOptions: false,
};

const getters: GetterTree<IngredientCategoryState, any> = {
  ingredientCategoriesList: (state): IngredientCategoriesList | null =>
    state.ingredientCategoriesList,
  isLoadingIngredientCategoriesList: (state) =>
    state.isLoadingIngredientCategoriesList,

  ingredientCategoryOptions: (state) =>
    state.ingredientCategoryOptions?.map((option) => ({
      value: option.id,
      label: option.name,
    })),
};

const actions: ActionTree<IngredientCategoryState, any> = {
  loadIngredientCategoriesList({ commit, rootState }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientCategoriesList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories" +
          getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientCategoriesList>) => {
          commit("setIsLoadingIngredientCategoriesList", false);
          commit("setIngredientCategoriesList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientCategoriesList", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadIngredientCategoryOptions({ commit, rootState }) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientCategoryOptions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories/options"
      )
        .then((response: AxiosResponse<IngredientCategoryOption[]>) => {
          commit("setIsLoadingIngredientCategoryOptions", false);
          commit("setIngredientCategoryOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientCategoryOptions", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadIngredientCategory({ commit, rootState }, ingredientCategoryId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientCategory", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories/" +
          ingredientCategoryId
      )
        .then((response: AxiosResponse<IngredientCategory>) => {
          commit("setIsLoadingIngredientCategory", false);
          commit("setIngredientCategory", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientCategory", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  createIngredientCategory(
    { commit, rootState },
    ingredientCategory: IngredientCategory
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingIngredientCategory", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories",
        ingredientCategory
      )
        .then(() => {
          rootState.toastNotification.success("Dodano kategorię.");
          commit("setIsSubmittingIngredientCategory", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingIngredientCategory", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  updateIngredientCategory(
    { commit, rootState },
    ingredientCategory: IngredientCategory
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingIngredientCategory", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories/" +
          ingredientCategory.id,
        ingredientCategory
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano kategorię.");
          commit("setIsSubmittingIngredientCategory", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingIngredientCategory", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<IngredientCategoryState> = {
  setIngredientCategoriesList(state, list: IngredientCategoriesList) {
    state.ingredientCategoriesList = list;
  },

  setIsLoadingIngredientCategoriesList(state, value) {
    state.isLoadingIngredientCategoriesList = value;
  },

  setIngredientCategoryOptions(state, list: IngredientCategoryOption[]) {
    state.ingredientCategoryOptions = list;
  },

  setIsLoadingIngredientCategoryOptions(state, value) {
    state.isLoadingIngredientCategoryOptions = value;
  },

  setIsSubmittingIngredientCategory(state, value) {
    state.isSubmittingIngredientCategory = value;
  },

  setIngredientCategory(state, ingredientCategory: IngredientCategory) {
    state.ingredientCategory = ingredientCategory;
  },

  setIsLoadingIngredientCategory(state, value) {
    state.isLoadingIngredientCategory = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
