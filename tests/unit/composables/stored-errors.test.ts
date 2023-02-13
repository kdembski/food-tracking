import flushPromises from "flush-promises";
import { provide } from "vue";
import { mount as composableMount } from "vue-composable-tester";
import { createStore } from "vuex";
import { useStoredErrors } from "@/composables/stored-errors";

describe("Edit Ingredient Modal Ingredient Composable", () => {
  let composable: any;
  let store: any;
  let getters: any;
  let mutations: any;

  beforeEach(async () => {
    getters = {
      errors: () => ({
        child: {
          child: {
            code: "code",
            message: "message",
          },
        },
      }),
    };
    mutations = {
      setErrors: jest.fn(),
    };

    store = createStore({
      modules: {
        test: {
          namespaced: true,
          getters,
          mutations,
        },
      },
    });

    composable = composableMount(() => useStoredErrors("test"), {
      provider: () => {
        provide("store", store);
      },
    }).result;
  });

  it("Should return error message based on provided path", async () => {
    expect(composable.getErrorMessage(["child", "child"])).toEqual("message");
  });

  it("Should clear error for field at the end of provided path", async () => {
    await composable.clearError(["child", "child"]);
    expect(composable.errors.value.child.child).toEqual(undefined);
  });

  it("Should clear all errors", async () => {
    await composable.clearAllErrors();
    expect(mutations.setErrors).toHaveBeenCalledTimes(1);
    expect(mutations.setErrors).toHaveBeenCalledWith(expect.any(Object), null);
  });
});
