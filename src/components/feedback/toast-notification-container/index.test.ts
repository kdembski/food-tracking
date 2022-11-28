import { useToastNotification } from "@/composables/toast-notification";
import { mount } from "@vue/test-utils";
import { mount as composableMount } from "vue-composable-tester";
import CToastNotificationContainer from "./index.vue";
import CToastNotification from "@/components/feedback/toast-notification/index.vue";
import { createStore } from "vuex";
import { provide } from "vue";

describe("Toast Notification Container Component", () => {
  let wrapper: any;
  let store: any;
  let toastNotification: any;
  let state: any;
  let mutations: any;

  const mountComponent = (toastNotifications: any) => {
    state = {
      toastNotifications,
    };

    mutations = {
      unshiftToastNotification: jest.fn(),
      popToastNotification: jest.fn(),
    };

    store = createStore({
      state,
      mutations,
    });

    global.settings.provide = {
      store,
    };

    jest.useFakeTimers();

    toastNotification = composableMount(() => useToastNotification(), {
      provider: () => {
        provide("store", store);
      },
    }).result;

    wrapper = mount(CToastNotificationContainer, { global: global.settings });
  };

  beforeEach(async () => {
    mountComponent([{ id: "id" }]);
  });

  it("Should render toast notification component inside container", async () => {
    expect(wrapper.findAllComponents(CToastNotification).length).toEqual(1);
  });

  it("isEmpty should return true if toastNotifications array is empty", async () => {
    expect(wrapper.vm.isEmpty()).toBe(false);
    mountComponent([]);
    expect(wrapper.vm.isEmpty()).toBe(true);
  });

  it("Should push notification to array after add method call and remove it after timeout", async () => {
    const addedToastNotification = {
      id: expect.any(String),
      type: "success",
      message: "success message",
      action: undefined,
      actionText: undefined,
    };

    toastNotification.add("success", "success message");
    expect(mutations.unshiftToastNotification).toHaveBeenCalledWith(
      expect.any(Object),
      addedToastNotification
    );
    jest.runAllTimers();
    expect(mutations.popToastNotification).toHaveBeenCalledTimes(1);
  });

  it("Should push success notification to array after success method", async () => {
    const addedToastNotification = {
      id: expect.any(String),
      type: "success",
      message: "success message",
      action: undefined,
      actionText: undefined,
    };

    toastNotification.success("success message");
    expect(mutations.unshiftToastNotification).toHaveBeenCalledWith(
      expect.any(Object),
      addedToastNotification
    );
  });

  it("Should push error notification to array after error method", async () => {
    const addedToastNotification = {
      id: expect.any(String),
      type: "error",
      message: "error message",
      action: undefined,
      actionText: undefined,
    };

    toastNotification.error("error message");
    expect(mutations.unshiftToastNotification).toHaveBeenCalledWith(
      expect.any(Object),
      addedToastNotification
    );
  });
});
