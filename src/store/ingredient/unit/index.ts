import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { ListFilters } from "@/types/components/data-display/list";
import {
  IngredientUnit,
  IngredientUnitErrors,
  IngredientUnitOption,
  IngredientUnitsList,
  IngredientUnitState,
} from "@/types/ingredients/unit";
import { getListQuery } from "@/store/helpers/list-query";

const state: IngredientUnitState = {
  single: null,
  isLoading: false,
  isSubmitting: false,

  list: null,
  isLoadingList: false,

  options: null,
  isLoadingOptions: false,

  errors: null,
};

const getters: GetterTree<IngredientUnitState, any> = {
  list: (state): IngredientUnitsList | null => state.list,
  isLoadingList: (state) => state.isLoadingList,

  options: (state) =>
    state.options?.map((option) => ({
      value: option.id,
      label: option.name,
    })),

  errors: (state) => state.errors,
};

const actions: ActionTree<IngredientUnitState, any> = {
  loadList({ commit, dispatch }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/units" +
          getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientUnitsList>) => {
          commit("setIsLoadingList", false);
          commit("setList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingList", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  loadOptions({ commit, dispatch }) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingOptions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/units/options"
      )
        .then((response: AxiosResponse<IngredientUnitOption[]>) => {
          commit("setIsLoadingOptions", false);
          commit("setOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingOptions", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  load({ commit, dispatch }, itemId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoading", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/units/" + itemId
      )
        .then((response: AxiosResponse<IngredientUnit>) => {
          commit("setIsLoading", false);
          commit("setSingle", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoading", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  create({ commit, dispatch, rootState }, item: IngredientUnit) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/units",
        item
      )
        .then(() => {
          rootState.toastNotification.success("Dodano składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          dispatch(
            "handleComplexError",
            { error, module: "ingredient/unit" },
            { root: true }
          );
        });
    });
  },

  update({ commit, dispatch, rootState }, item: IngredientUnit) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/units/" + item.id,
        item
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          dispatch(
            "handleComplexError",
            { error, module: "ingredient/unit" },
            { root: true }
          );
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/units/" + itemId
      )
        .then(() => {
          rootState.toastNotification.success("Usunięto składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },
};

const mutations: MutationTree<IngredientUnitState> = {
  setList(state, list: IngredientUnitsList) {
    state.list = list;
  },

  setIsLoadingList(state, value) {
    state.isLoadingList = value;
  },

  setOptions(state, list: IngredientUnitOption[]) {
    state.options = list;
  },

  setIsLoadingOptions(state, value) {
    state.isLoadingOptions = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setSingle(state, ingredient: IngredientUnit) {
    state.single = ingredient;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },

  setErrors(state, value: IngredientUnitErrors) {
    state.errors = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
