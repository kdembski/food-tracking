import {
  RecipeIngredient,
  RecipeIngredientFilterOption,
  RecipeIngredientsErrors,
} from "@/types/recipes/recipeIngredient";
import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { RecipeIngredientState } from "@/types/recipes/recipeIngredient";
import { ListFilters } from "@/types/components/data-display/list";
import { getCustomFiltersQuery } from "../../helpers/list-query";
import { RecipesFilters } from "@/types/recipes/recipe";

const state: RecipeIngredientState = {
  collection: null,
  isLoadingCollection: false,
  isSubmittingCollection: false,

  errors: null,

  filterOptions: null,
  isLoadingFilterOptions: false,
};

const getters: GetterTree<RecipeIngredientState, any> = {
  errors: (state) => state.errors,
};

const actions: ActionTree<RecipeIngredientState, any> = {
  loadCollection({ commit, dispatch }, recipeId) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingCollection", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/" +
          recipeId +
          "/ingredients"
      )
        .then((response: AxiosResponse<RecipeIngredient[]>) => {
          commit("setIsLoadingCollection", false);
          commit("setCollection", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingCollection", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  loadFilterOptions(
    { commit, dispatch },
    filters: ListFilters<RecipesFilters>
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsLoadingFilterOptions", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/ingredients/options" +
          getCustomFiltersQuery(filters)
      )
        .then((response: AxiosResponse<RecipeIngredientFilterOption[]>) => {
          commit("setIsLoadingFilterOptions", false);
          commit("setFilterOptions", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsLoadingFilterOptions", false);
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  createCollection(
    { commit, dispatch, rootState },
    {
      collection,
      recipeId,
    }: { collection: RecipeIngredient[]; recipeId: number }
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingCollection", true);

      ApiService.post(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/" +
          recipeId +
          "/ingredients",
        collection
      )
        .then(() => {
          commit("setIsSubmittingCollection", false);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingCollection", false);
          dispatch(
            "handleComplexError",
            { error, module: "recipe/ingredient" },
            { root: true }
          );
        });
    });
  },

  updateCollection(
    { commit, dispatch, rootState },
    {
      collection,
      recipeId,
    }: { collection: RecipeIngredient[]; recipeId: number }
  ) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsSubmittingCollection", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL +
          "/recipes/" +
          recipeId +
          "/ingredients",
        collection
      )
        .then(() => {
          commit("setIsSubmittingCollection", false);
          rootState.toastNotification.success("Zapisano składniki.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsSubmittingCollection", false);
          dispatch(
            "handleComplexError",
            { error, module: "recipe/ingredient" },
            { root: true }
          );
        });
    });
  },
};

const mutations: MutationTree<RecipeIngredientState> = {
  setIsSubmittingCollection(state, value) {
    state.isSubmittingCollection = value;
  },

  setCollection(state, collection: RecipeIngredient[]) {
    state.collection = collection;
  },

  setIsLoadingCollection(state, value) {
    state.isLoadingCollection = value;
  },

  setErrors(state, value: { _items: RecipeIngredientsErrors[] } | null) {
    state.errors = value?._items || null;
  },

  setIsLoadingFilterOptions(state, value) {
    state.isLoadingFilterOptions = value;
  },

  setFilterOptions(state, value: RecipeIngredientFilterOption[]) {
    state.filterOptions = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
