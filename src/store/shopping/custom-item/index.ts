import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import {
  ShoppingCustomItem,
  ShoppingCustomItemOption,
  ShoppingCustomItemState,
} from "@/types/shopping/custom-item";

const state: () => ShoppingCustomItemState = () => ({
  options: null,
  isLoadingOptions: false,
  isLoading: false,
  isSubmitting: false,
});

const getters: GetterTree<ShoppingCustomItemState, any> = {};

const actions: ActionTree<ShoppingCustomItemState, any> = {
  loadOptions({ commit, dispatch }) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingOptions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/shopping/custom-items/options"
      )
        .then((response: AxiosResponse<ShoppingCustomItemOption[]>) => {
          commit("setOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingOptions", false);
        });
    });
  },

  create({ commit, dispatch, rootState }, item: ShoppingCustomItem) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL + "/shopping/custom-items",
        item
      )
        .then(() => {
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  update({ commit, dispatch, rootState }, item: ShoppingCustomItem) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/shopping/custom-items/" + item.id,
        item
      )
        .then(() => {
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/custom-items/" + itemId
      )
        .then(() => {
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },
};

const mutations: MutationTree<ShoppingCustomItemState> = {
  setOptions(state, options: ShoppingCustomItemOption[]) {
    state.options = options;
  },

  setIsLoadingOptions(state, value) {
    state.isLoadingOptions = value;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
