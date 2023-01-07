import ApiService from "@/services/api.service";
import { MemberState, Member } from "@/types/members/member";
import { ApiError } from "@/types/api";
import { MutationTree, ActionTree } from "vuex";
import { AxiosResponse, AxiosError } from "axios";
import { getErrorMessage } from "../helpers/error-message";

const state: MemberState = {
  members: [],
};

const actions: ActionTree<MemberState, any> = {
  loadMembers({ commit }) {
    return new Promise<void>((resolve, reject) => {
      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/members")
        .then((response: AxiosResponse<Member[]>) => {
          commit("setMembers", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          reject(getErrorMessage(error));
        });
    });
  },
};

const mutations: MutationTree<MemberState> = {
  setMembers(state, value) {
    state.members = value;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
