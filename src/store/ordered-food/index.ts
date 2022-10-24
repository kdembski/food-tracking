import ApiService from "@/services/api.service";
import { OrderedFoodState, OrderedFoodList } from "@/types/ordered-food";
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
};

const getters: GetterTree<OrderedFoodState, any> = {
  getOrderedFoodList: (state): OrderedFoodList | null => state.orderedFoodList,
  isLoadingOrderedFoodList: (state) => state.isLoadingOrderedFoodList,

  getOrderedFoodTags: (state): string | null => state.orderedFoodTags,
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
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingOrderedFoodTags", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ordered/tags" +
          getListBaseQuery(filters)
      )
        .then((response: AxiosResponse<{ orderedFoodTags: string }>) => {
          commit("setIsLoadingOrderedFoodTags", false);
          commit("setOrderedFoodTags", response.data.orderedFoodTags);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingOrderedFoodTags", false);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
