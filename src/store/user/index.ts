import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import { UserState, LoginResponse } from "@/types/user";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { AxiosResponse, AxiosError } from "axios";

const state: UserState = {
  accessToken: StorageService.getItem("accessToken"),
  isLoggingIn: false,
};

const getters: GetterTree<UserState, any> = {
  isLoggedIn: (state: UserState): boolean => !!state.accessToken,

  getAccessToken: (state: UserState): string | null => state.accessToken,
};

const actions: ActionTree<UserState, any> = {
  login({ commit }: ActionContext<UserState, any>, password: string) {
    return new Promise<void>((resolve, reject) => {
      commit("loginRequest");

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/login", {
        password,
      })
        .then((response: AxiosResponse<LoginResponse>) => {
          commit("loginSuccess", response.data.accessToken);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          const errorMessage: string | undefined =
            error.response?.data.message || error.code;

          commit("loginError", errorMessage);
          reject(errorMessage);
        });
    });
  },
};

const mutations: MutationTree<UserState> = {
  loginRequest(state: UserState) {
    state.isLoggingIn = true;
  },

  loginSuccess(state: UserState, accessToken: string) {
    state.isLoggingIn = false;
    state.accessToken = accessToken;
    StorageService.setItem("accessToken", accessToken);
    ApiService.setHeader();
  },

  loginError(state: UserState, error: string) {
    state.isLoggingIn = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
