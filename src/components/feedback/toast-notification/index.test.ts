import { mount } from "@vue/test-utils";
import CToastNotification from "./index.vue";
import { createStore } from "vuex";

describe("Toast Notification Component", () => {
  let wrapper: any = null;
  let store: any;
  let toastNotification = {
    id: "id",
    action: jest.fn(),
    actionText: "actionText",
  };
  let state;
  let mutations: any;

  beforeEach(async () => {
    state = {
      toastNotifications: [toastNotification],
    };

    mutations = {
      spliceToastNotification: jest.fn(),
    };

    store = createStore({
      state,
      mutations,
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CToastNotification, {
      props: { ...toastNotification },
      global: global.settings,
    });
  });

  it("Should add class based on type prop", async () => {
    expect(wrapper.find(".toast-notification__wrapper").classes()).toContain(
      "toast-notification--success"
    );
  });

  it("Should render action text and trigger action on click", async () => {
    const actionButton = wrapper.find(".toast-notification__action");
    expect(actionButton.text()).toEqual("actionText");
    await actionButton.trigger("click");
    expect(toastNotification.action).toHaveBeenCalledTimes(1);
  });

  it("Should trigger spliceToastNotification mutation on remove button click", async () => {
    const removeButton = wrapper.find(".toast-notification__remove-button");
    await removeButton.trigger("click");
    expect(mutations.spliceToastNotification).toHaveBeenCalledTimes(1);
    expect(mutations.spliceToastNotification).toHaveBeenCalledWith(
      expect.any(Object),
      0
    );
  });
});
