import { mount } from "@vue/test-utils";
import CSelectMembers from "@/components/controls/select-members/index.vue";
import { createStore } from "vuex";
import * as vue from "vue";

describe("Select Members Component", () => {
  let wrapper: any;
  let store: any;
  let state: any;

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

    wrapper = mount(CSelectMembers, {
      props: {
        selectedMembers: [1],
      },
      global: global.settings,
    });
  });

  it("Should add member id to selected on input click", async () => {
    const checkbox = wrapper.find("#member-2");
    await checkbox.setChecked();
    expect(wrapper.emitted()["update:selectedMembers"][0][0]).toEqual([1, 2]);
  });

  it("Should show loader if isLoading is true", async () => {
    const loader = wrapper.find(".select-members__loader");
    expect(loader.exists()).toBe(false);

    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(".select-members__loader").exists()).toBe(true);
  });

  it("Should add component id to item id", async () => {
    jest.spyOn(vue, "useAttrs").mockReturnValue({ id: "test-id" });
    wrapper = mount(CSelectMembers, {
      global: global.settings,
    });

    expect(wrapper.vm.getItemId(1)).toEqual("test-id-member-1");
  });
});
