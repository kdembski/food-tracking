import flushPromises from "flush-promises";
import { mount } from "@vue/test-utils";
import LoginView from "./index.vue";
import { createStore } from "vuex";

let routerPush: any;
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPush,
  }),
  useRoute: () => ({
    query: {
      redirect: "redirect",
    },
  }),
}));

describe("Login View", () => {
  let wrapper: any;
  let store: any;
  let actions: any;

  beforeEach(async () => {
    actions = {
      login: jest.fn(),
    };

    store = createStore({
      modules: {
        user: {
          namespaced: true,
          actions,
          state: {
            isLoggingIn: false,
          },
        },
      },
    });

    global.settings.provide = {
      store,
    };

    routerPush = jest.fn();

    wrapper = mount(LoginView, {
      global: global.settings,
    });
  });

  it("Should push router to route query redirect on successful login", async () => {
    actions.login.mockImplementation(() => Promise.resolve());
    await wrapper.vm.onLoginFormSubmit();
    await flushPromises();
    expect(routerPush).toHaveBeenCalledWith("redirect");
  });

  it("Should set error message on failed login", async () => {
    wrapper.vm.password = "password";
    actions.login.mockImplementation(() => Promise.reject("error"));
    await wrapper.vm.onLoginFormSubmit();
    await flushPromises();
    expect(wrapper.vm.passwordErrorMessage).toEqual("error");
    expect(wrapper.vm.password).toEqual("");
  });

  it("Should clear error message on clearPasswordErrorMessage call", async () => {
    wrapper.vm.passwordErrorMessage = "error";
    await wrapper.vm.clearPasswordErrorMessage();
    expect(wrapper.vm.passwordErrorMessage).toEqual("");
  });
});
