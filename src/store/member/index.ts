import ApiService from "@/services/api.service";
import { MemberState, Member } from "@/types/members/member";
import { ApiError } from "@/types/api";
import { MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";

const state: MemberState = {
  all: [],
};

const actions: ActionTree<MemberState, any> = {
  loadAll({ commit, dispatch }) {
    return new Promise<void>((resolve) => {
      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/members")
        .then((response: AxiosResponse<Member[]>) => {
          commit("setAll", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },
};

const mutations: MutationTree<MemberState> = {
  setAll(state, value) {
    state.all = value;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
