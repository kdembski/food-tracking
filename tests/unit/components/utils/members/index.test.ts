import { mount } from "@vue/test-utils";
import CMembers from "@/components/utils/members/index.vue";
import { createStore } from "vuex";

describe("Members Component", () => {
  let wrapper: any;
  let store: any;

  beforeEach(async () => {
    store = createStore({
      getters: {
        isDarkModeEnabled: () => false,
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CMembers, {
      props: {
        members: [
          { id: 1, name: "test1" },
          { id: 2, name: "test2" },
        ],
      },
      global: global.settings,
    });
  });

  it("Should return uppercased first name letter on getItemLabel call", async () => {
    expect(wrapper.vm.getItemLabel({ id: 1, name: "test" })).toEqual("T");
  });

  it("Should return bg color on getItemBackgroundColor call", async () => {
    expect(wrapper.vm.getItemBackgroundColor({ id: 1, name: "test" })).toEqual(
      "#80d7e0"
    );
  });
});
