import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import { UserState, LoginResponse } from "@/types/users/user";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getErrorMessage } from "../helpers/error-message";

const state: UserState = {
  accessToken: StorageService.getItem("accessToken"),
  isLoggingIn: false,
};

const getters: GetterTree<UserState, any> = {
  isLoggedIn: (state): boolean => !!state.accessToken,
  getAccessToken: (state): string | null => state.accessToken,
};

const actions: ActionTree<UserState, any> = {
  login({ commit }, password: string) {
    return new Promise<void>((resolve, reject) => {
      commit("setIsloggingIn", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/users/login", {
        password,
      })
        .then((response: AxiosResponse<LoginResponse>) => {
          commit("setIsloggingIn", false);
          commit("setAccessToken", response.data.accessToken);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          commit("setIsloggingIn", false);
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<UserState> = {
  setIsloggingIn(state, value) {
    state.isLoggingIn = value;
  },

  setAccessToken(state, token) {
    state.accessToken = token;
    StorageService.setItem("accessToken", token);
    ApiService.setHeader();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
