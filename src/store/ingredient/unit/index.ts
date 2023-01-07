import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { ListFilters } from "@/types/components/list";
import {
  IngredientUnitsList,
  IngredientUnit,
  IngredientUnitOption,
  IngredientUnitState,
} from "@/types/ingredients/unit";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "@/store/helpers/error-message";
import { getListQuery } from "@/store/helpers/list-query";

const state: IngredientUnitState = {
  ingredientUnit: null,
  isLoadingIngredientUnit: false,
  isSubmittingIngredientUnit: false,

  ingredientUnitsList: null,
  isLoadingIngredientUnitsList: false,

  ingredientUnitOptions: null,
  isLoadingIngredientUnitOptions: false,
};

const getters: GetterTree<IngredientUnitState, any> = {
  ingredientUnitsList: (state): IngredientUnitsList | null =>
    state.ingredientUnitsList,
  isLoadingIngredientUnitsList: (state) => state.isLoadingIngredientUnitsList,

  ingredientUnitOptions: (state) =>
    state.ingredientUnitOptions?.map((option) => ({
      value: option.id,
      label: option.name,
    })),
};

const actions: ActionTree<IngredientUnitState, any> = {
  loadIngredientUnitsList({ commit, rootState }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientUnitsList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories" +
          getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientUnitsList>) => {
          commit("setIsLoadingIngredientUnitsList", false);
          commit("setIngredientUnitsList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientUnitsList", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadIngredientUnitOptions({ commit, rootState }) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientUnitOptions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories/options"
      )
        .then((response: AxiosResponse<IngredientUnitOption[]>) => {
          commit("setIsLoadingIngredientUnitOptions", false);
          commit("setIngredientUnitOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientUnitOptions", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadIngredientUnit({ commit, rootState }, ingredientUnitId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingIngredientUnit", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories/" +
          ingredientUnitId
      )
        .then((response: AxiosResponse<IngredientUnit>) => {
          commit("setIsLoadingIngredientUnit", false);
          commit("setIngredientUnit", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingIngredientUnit", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  createIngredientUnit({ commit, rootState }, ingredientUnit: IngredientUnit) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingIngredientUnit", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories",
        ingredientUnit
      )
        .then(() => {
          rootState.toastNotification.success("Dodano jednostkę.");
          commit("setIsSubmittingIngredientUnit", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingIngredientUnit", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  updateIngredientUnit({ commit, rootState }, ingredientUnit: IngredientUnit) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingIngredientUnit", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories/" +
          ingredientUnit.id,
        ingredientUnit
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano jednostkę.");
          commit("setIsSubmittingIngredientUnit", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingIngredientUnit", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<IngredientUnitState> = {
  setIngredientUnitsList(state, list: IngredientUnitsList) {
    state.ingredientUnitsList = list;
  },

  setIsLoadingIngredientUnitsList(state, value) {
    state.isLoadingIngredientUnitsList = value;
  },

  setIngredientUnitOptions(state, list: IngredientUnitOption[]) {
    state.ingredientUnitOptions = list;
  },

  setIsLoadingIngredientUnitOptions(state, value) {
    state.isLoadingIngredientUnitOptions = value;
  },

  setIsSubmittingIngredientUnit(state, value) {
    state.isSubmittingIngredientUnit = value;
  },

  setIngredientUnit(state, ingredientUnit: IngredientUnit) {
    state.ingredientUnit = ingredientUnit;
  },

  setIsLoadingIngredientUnit(state, value) {
    state.isLoadingIngredientUnit = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
