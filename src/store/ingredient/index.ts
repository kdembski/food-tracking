import ApiService from "@/services/api.service";
import { ApiError, ErrorCodes } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/components/data-display/list";
import {
  Ingredient,
  IngredientErrors,
  IngredientOption,
  IngredientsList,
  IngredientState,
} from "@/types/ingredients/ingredient";
import unit from "./unit/index";
import category from "./category/index";

const state: () => IngredientState = () => ({
  single: null,
  isLoading: false,
  isSubmitting: false,

  list: null,
  isLoadingList: false,

  options: null,
  isLoadingOptions: false,

  errors: null,
});

const getters: GetterTree<IngredientState, any> = {
  list: (state): IngredientsList | null => state.list,
  isLoadingList: (state) => state.isLoadingList,

  options: (state) =>
    state.options?.map((option) => ({
      value: option.id,
      label: option.name,
    })),

  errors: (state) => state.errors,
};

const actions: ActionTree<IngredientState, any> = {
  loadList({ commit, dispatch }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients" + getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientsList>) => {
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

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/ingredients/options")
        .then((response: AxiosResponse<IngredientOption[]>) => {
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
    return new Promise<Ingredient>((resolve, reject) => {
      commit("setIsLoading", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/ingredients/" + itemId)
        .then((response: AxiosResponse<Ingredient>) => {
          commit("setIsLoading", false);
          commit("setSingle", response.data);
          resolve(response.data);
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoading", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  create({ commit, dispatch, rootState }, item: Ingredient) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/ingredients", item)
        .then(() => {
          rootState.toastNotification.success("Dodano składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmitting", false);
          dispatch(
            "handleComplexError",
            { error, module: "ingredient" },
            { root: true }
          );
        });
    });
  },

  update({ commit, dispatch, rootState }, item: Ingredient) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + item.id,
        item
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano składnik.");
          commit("setIsSubmitting", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError<IngredientErrors | string>>) => {
          commit("setIsSubmitting", false);
          dispatch(
            "handleComplexError",
            { error, module: "ingredient" },
            { root: true }
          );
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + itemId
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

const mutations: MutationTree<IngredientState> = {
  setList(state, list: IngredientsList) {
    state.list = list;
  },

  setIsLoadingList(state, value) {
    state.isLoadingList = value;
  },

  setOptions(state, list: IngredientOption[]) {
    state.options = list;
  },

  setIsLoadingOptions(state, value) {
    state.isLoadingOptions = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setSingle(state, ingredient: Ingredient) {
    ingredient.units = ingredient.units || [];
    state.single = ingredient;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },

  setErrors(state, value: IngredientErrors) {
    state.errors = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    unit,
    category,
  },
};
