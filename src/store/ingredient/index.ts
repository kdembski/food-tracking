import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getListQuery } from "../helpers/list-query";
import { ListFilters } from "@/types/components/data-display/list";
import {
  Ingredient,
  IngredientErrors,
  IngredientOption,
  IngredientsFilters,
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
  list: (state) => state.list,
  isLoadingList: (state) => state.isLoadingList,

  options: (state) =>
    state.options?.map((option) => ({
      value: option.id,
      label: option.name,
    })),

  errors: (state) => state.errors,

  primaryUnit: (state) => state.single?.units.find((unit) => unit.isPrimary),

  getNameById: (state) => (id: number) =>
    state.options?.find((options) => options.id === id)?.name,
};

const actions: ActionTree<IngredientState, any> = {
  loadList({ commit, dispatch }, filters: ListFilters<IngredientsFilters>) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingList", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL + "/ingredients" + getListQuery(filters)
      )
        .then((response: AxiosResponse<IngredientsList>) => {
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

  loadOptions({ commit, dispatch }) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingOptions", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/ingredients/options")
        .then((response: AxiosResponse<IngredientOption[]>) => {
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

  load({ commit, dispatch }, itemId) {
    return new Promise<Ingredient>((resolve) => {
      commit("setIsLoading", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/ingredients/" + itemId)
        .then((response: AxiosResponse<Ingredient>) => {
          commit("setSingle", response.data);
          resolve(response.data);
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    });
  },

  create({ commit, dispatch, rootState }, item: Ingredient) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/ingredients", item)
        .then(() => {
          rootState.toastNotification.success("Dodano składnik.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch(
            "handleComplexError",
            { error, module: "ingredient" },
            { root: true }
          );
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  update({ commit, dispatch, rootState }, item: Ingredient) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + item.id,
        item
      )
        .then(() => {
          rootState.toastNotification.success("Zapisano składnik.");
          resolve();
        })
        .catch((error: AxiosError<ApiError<IngredientErrors | string>>) => {
          dispatch(
            "handleComplexError",
            { error, module: "ingredient" },
            { root: true }
          );
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
        process.env.VUE_APP_SERVICE_URL + "/ingredients/" + itemId
      )
        .then(() => {
          rootState.toastNotification.success("Usunięto składnik.");
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

  setSingle(state, ingredient: Ingredient | null) {
    if (!ingredient) {
      return;
    }

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
