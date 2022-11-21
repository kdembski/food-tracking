import { mount } from "@vue/test-utils";
import CDisplayMembers from "./index.vue";
import { createStore } from "vuex";

describe("Display Members Component", () => {
  let wrapper: any = null;
  let store: any = null;
  let state: any = null;

  beforeEach(async () => {
    state = {
      members: [
        { id: 1, name: "test1" },
        { id: 2, name: "test2" },
      ],
    };

    store = createStore({
      modules: {
        member: {
          state,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CDisplayMembers, {
      props: {
        memberIds: [1],
      },
      global: global.settings,
    });
  });

  it("Should filters members by provided member ids", async () => {
    expect(wrapper.vm.members).toEqual([
      {
        id: 1,
        name: "test1",
      },
    ]);
  });
});
