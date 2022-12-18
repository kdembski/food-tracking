import ApiService from "@/services/api.service";
import {
  OrderedFoodState,
  OrderedFoodList,
  OrderedFood,
} from "@/types/ordered-food";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery, getListBaseQuery } from "../helpers/list-query";
import { ListFilters, ListBaseFilters } from "@/types/components/list";
import {
  getErrorMessage,
  showDefualtErrorNotification,
} from "../helpers/error-message";

const state: OrderedFoodState = {
  orderedFoodList: null,
  isLoadingOrderedFoodList: false,

  orderedFoodTags: null,
  isLoadingOrderedFoodTags: false,

  orderedFood: null,
  isSubmittingOrderedFood: false,
  isLoadingOrderedFood: false,
};

const getters: GetterTree<OrderedFoodState, any> = {
  orderedFoodList: (state): OrderedFoodList | null => state.orderedFoodList,
  isLoadingOrderedFoodList: (state) => state.isLoadingOrderedFoodList,

  orderedFoodTags: (state): string | null => state.orderedFoodTags,
  isLoadingOrderedFoodTags: (state) => state.isLoadingOrderedFoodTags,
};

const actions: ActionTree<OrderedFoodState, any> = {
  loadOrderedFoodList({ commit, rootState }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingOrderedFoodList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ordered" + getListQuery(filters)
      )
        .then((response: AxiosResponse<OrderedFoodList>) => {
          commit("setIsLoadingOrderedFoodList", false);
          commit("setOrderedFoodList", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingOrderedFoodList", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadOrderedFoodTags({ commit, rootState }, filters: ListBaseFilters) {
    return new Promise<string[]>((resolve, reject) => {
      commit("setIsLoadingOrderedFoodTags", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ordered/tags" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<string[]>) => {
          const tags = response.data;
          commit("setIsLoadingOrderedFoodTags", false);
          commit("setOrderedFoodTags", tags);
          resolve(tags);
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingOrderedFoodTags", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  loadOrderedFood({ commit, rootState }, orderedFoodId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingOrderedFood", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ordered/" + orderedFoodId
      )
        .then((response: AxiosResponse<OrderedFood>) => {
          commit("setIsLoadingOrderedFood", false);
          commit("setOrderedFood", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingOrderedFood", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  createOrderedFood({ commit, rootState }, orderedFood: OrderedFood) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingOrderedFood", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/ordered", orderedFood)
        .then(() => {
          rootState.toastNotification.success("Dodano zamawiane jedzenie.");
          commit("setIsSubmittingOrderedFood", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingOrderedFood", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },

  updateOrderedFood({ commit, rootState }, orderedFood: OrderedFood) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingOrderedFood", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ordered/" + orderedFood.id,
        orderedFood
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano zamawiane jedzenie.");
          commit("setIsSubmittingOrderedFood", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingOrderedFood", false);
          showDefualtErrorNotification(error, rootState);
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<OrderedFoodState> = {
  setOrderedFoodList(state, list: OrderedFoodList) {
    state.orderedFoodList = list;
  },

  setIsLoadingOrderedFoodList(state, value: boolean) {
    state.isLoadingOrderedFoodList = value;
  },

  setOrderedFoodTags(state, tags: string) {
    state.orderedFoodTags = tags;
  },

  setIsLoadingOrderedFoodTags(state, value: boolean) {
    state.isLoadingOrderedFoodTags = value;
  },

  setIsSubmittingOrderedFood(state, value) {
    state.isSubmittingOrderedFood = value;
  },

  setOrderedFood(state, orderedFood: OrderedFood) {
    state.orderedFood = orderedFood;
  },

  setIsLoadingOrderedFood(state, value) {
    state.isLoadingOrderedFood = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
