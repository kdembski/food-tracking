import flushPromises from "flush-promises";
import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import WeeklyCalendar from "./index.vue";

let toastSuccess: any;
let toastError: any;
jest.mock("@/composables/toast-notification", () => ({
  useToastNotification: () => ({
    success: toastSuccess,
    error: toastError,
  }),
}));

describe("Edit Weekly Calendar Item Modal", () => {
  let wrapper: any;
  let store: any;
  let actions: any;

  beforeEach(async () => {
    actions = {
      updateCalendarItemMembers: jest.fn(),
    };

    store = createStore({
      modules: {
        calendar: {
          namespaced: true,
          actions,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    toastSuccess = jest.fn();
    toastError = jest.fn();

    wrapper = shallowMount(WeeklyCalendar, {
      props: {
        isOpen: true,
      },
      global: global.settings,
    });
  });

  it("Should emit update:isOpen event on closeModal call", async () => {
    await wrapper.vm.closeModal();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should show success notification after successful item update", async () => {
    actions.updateCalendarItemMembers.mockImplementation(() =>
      Promise.resolve()
    );
    await wrapper.vm.updateCalendarItemMembers();
    await flushPromises();
    expect(toastSuccess).toHaveBeenCalledTimes(1);
  });

  it("Should show error notification after failed item update", async () => {
    actions.updateCalendarItemMembers.mockImplementation(() =>
      Promise.reject()
    );
    await wrapper.vm.updateCalendarItemMembers();
    await flushPromises();
    expect(toastError).toHaveBeenCalledTimes(1);
  });
});
