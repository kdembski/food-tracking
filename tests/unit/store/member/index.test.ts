import flushPromises from "flush-promises";
import { createStore } from "vuex";

let mockAxiosGet = jest.fn();
let mockAxiosPost = jest.fn();
let mockAxiosPut = jest.fn();
let mockAxiosDelete = jest.fn();
let mockAxiosPatch = jest.fn();

import member from "@/store/member/index";
jest.mock("@/services/api.service", () => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
  put: mockAxiosPut,
  delete: mockAxiosDelete,
  patch: mockAxiosPatch,
}));

describe("Member Store Module", () => {
  let store: any;
  let members: number[];

  beforeEach(async () => {
    members = [1, 2];

    store = createStore({
      actions: {
        handleDefaultError: jest.fn(),
      },
      modules: {
        member,
      },
    });
  });

  it("Should set members to state on successful loadAll action dispatch", async () => {
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: members }));
    await store.dispatch("member/loadAll");
    await flushPromises();

    expect(mockAxiosGet).toHaveBeenCalledWith("service/members");
    expect(store.state.member.all).toEqual(members);

    mockAxiosGet.mockImplementation(() => Promise.reject({ code: "error" }));
    store.dispatch("member/loadAll");
  });
});
