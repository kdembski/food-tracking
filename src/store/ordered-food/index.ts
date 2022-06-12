import ApiService from "@/services/api.service";
import { OrderedFoodState, OrderedFoodList } from "@/types/ordered-food";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/list";
import { getAvailableTagsQuery, TagsFilters } from "../helpers/tags-query";

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
  loadOrderedFoodList({ commit }, filters: ListFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadOrderedFoodListRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ordered" + getListQuery(filters)
      )
        .then((response: AxiosResponse<OrderedFoodList>) => {
          commit("loadOrderedFoodListSuccess", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("loadOrderedFoodListError", errorMessage);
          reject(errorMessage);
        });
    });
  },

  loadOrderedFoodTags({ commit }, filters: TagsFilters) {
    return new Promise<void>((resolve, reject) => {
      commit("loadOrderedFoodTagsRequest");

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/ordered/tags" +
          getAvailableTagsQuery(filters)
      )
        .then((response: AxiosResponse<{ orderedFoodTags: string }>) => {
          commit("loadOrderedFoodTagsSuccess", response.data.orderedFoodTags);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data?.message || error.code;

          commit("loadOrderedFoodTagsError", errorMessage);
          reject(errorMessage);
        });
    });
  },
};

const mutations: MutationTree<OrderedFoodState> = {
  loadOrderedFoodListRequest(state) {
    state.isLoadingOrderedFoodList = true;
  },

  loadOrderedFoodListSuccess(state, list: OrderedFoodList) {
    state.orderedFoodList = list;
    state.isLoadingOrderedFoodList = false;
  },

  loadOrderedFoodListError(state) {
    state.isLoadingOrderedFoodList = false;
  },

  loadOrderedFoodTagsRequest(state) {
    state.isLoadingOrderedFoodTags = true;
  },

  loadOrderedFoodTagsSuccess(state, tags: string) {
    state.orderedFoodTags = tags;
    state.isLoadingOrderedFoodTags = false;
  },

  loadOrderedFoodTagsError(state) {
    state.isLoadingOrderedFoodTags = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
