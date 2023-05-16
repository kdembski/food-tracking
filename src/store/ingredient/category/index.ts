import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { ListFilters } from "@/types/components/data-display/list";
import {
  IngredientCategory,
  IngredientCategoryOption,
  IngredientCategoriesList,
  IngredientCategoryState,
  IngredientCategoryErrors,
  IngredientCategoriesFilters,
} from "@/types/ingredients/category";
import { getListQuery } from "@/store/helpers/list-query";

const state: IngredientCategoryState = {
  single: null,
  isLoading: false,
  isSubmitting: false,

  list: null,
  isLoadingList: false,

  options: null,
  isLoadingOptions: false,

  errors: null,
};

const getters: GetterTree<IngredientCategoryState, any> = {
  list: (state): IngredientCategoriesList | null => state.list,
  isLoadingList: (state) => state.isLoadingList,

  options: (state) =>
    state.options?.map((option) => ({
      value: option.id,
      label: option.name,
    })),

  errors: (state) => state.errors,

  getNameById: (state) => (id: number) =>
    state.options?.find((options) => options.id === id)?.name,
};

const actions: ActionTree<IngredientCategoryState, any> = {
  loadList(
    { commit, dispatch },
    filters: ListFilters<IngredientCategoriesFilters>
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ingredients/categories" +
          getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientCategoriesList>) => {
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
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories/options"
      )
        .then((response: AxiosResponse<IngredientCategoryOption[]>) => {
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
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories/" + itemId
      )
        .then((response: AxiosResponse<IngredientCategory>) => {
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

  create({ commit, dispatch, rootState }, item: IngredientCategory) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories",
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
            { error, module: "ingredient/category" },
            { root: true }
          );
        });
    });
  },

  update({ commit, dispatch, rootState }, item: IngredientCategory) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories/" + item.id,
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
            { error, module: "ingredient/category" },
            { root: true }
          );
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/categories/" + itemId
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

  setErrors(state, value: IngredientCategoryErrors) {
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
