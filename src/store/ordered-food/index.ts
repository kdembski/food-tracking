import ApiService from "@/services/api.service";
import {
  OrderedFoodState,
  OrderedFoodList,
  OrderedFood,
  OrderedFoodFilters,
} from "@/types/ordered-food/ordered-food";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getCustomFiltersQuery, getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/components/data-display/list";
import { Tag } from "@/types/components/utils/tags";

const state: OrderedFoodState = {
  single: null,
  isLoading: false,
  isSubmitting: false,

  list: null,
  isLoadingList: false,

  tags: null,
  isLoadingTags: false,
};

const getters: GetterTree<OrderedFoodState, any> = {
  list: (state) => state.list,
  isLoadingList: (state) => state.isLoadingList,

  tags: (state) => state.tags,
  isLoadingTags: (state) => state.isLoadingTags,
};

const actions: ActionTree<OrderedFoodState, any> = {
  loadList({ commit, dispatch }, filters: ListFilters<OrderedFoodFilters>) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ordered" + getListQuery(filters)
      )
        .then((response: AxiosResponse<OrderedFoodList>) => {
          commit("setList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingList", false);
        });
    });
  },

  loadTags({ commit, dispatch }, filters: ListFilters<OrderedFoodFilters>) {
    return new Promise<string[]>((resolve) => {
      commit("setIsLoadingTags", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ordered/tags" +
          getCustomFiltersQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          const tags = response.data;
          commit("setTags", tags);
          resolve(tags);
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingTags", false);
        });
    });
  },

  load({ commit, dispatch }, itemId) {
    return new Promise<void>((resolve) => {
      commit("setIsLoading", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/ordered/" + itemId)
        .then((response: AxiosResponse<OrderedFood>) => {
          commit("setSingle", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    });
  },

  create({ commit, dispatch, rootState }, item: OrderedFood) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/ordered", item)
        .then(() => {
          rootState.toastNotification.success("Dodano jedzenie.");
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

  update({ commit, dispatch, rootState }, item: OrderedFood) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ordered/" + item.id,
        item
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano jedzenie.");
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

      ApiService.delete(process.env.VUE_APP_SERVICE_URL + "/ordered/" + itemId)
        .then(() => {
          rootState.toastNotification.success("Usunięto jedzenie.");
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

const mutations: MutationTree<OrderedFoodState> = {
  setList(state, list: OrderedFoodList) {
    state.list = list;
  },

  setIsLoadingList(state, value) {
    state.isLoadingList = value;
  },

  setTags(state, tags: Tag[]) {
    state.tags = tags;
  },

  setIsLoadingTags(state, value) {
    state.isLoadingTags = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setSingle(state, recipe: OrderedFood) {
    state.single = recipe;
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
