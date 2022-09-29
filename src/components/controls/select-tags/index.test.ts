import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import CSelectTags from "./index.vue";

describe("Select Tags Component", () => {
  let wrapper: any = null;
  let store;

  beforeEach(async () => {
    store = createStore({
      getters: {
        isDarkModeEnabled: () => false,
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CSelectTags, {
      props: { tags: "tag1,tag2,tag3", selectedTags: "tag1" },
      global: global.settings,
    });
  });

  it("Should set _selectedTags based on selectedTags props", async () => {
    expect(wrapper.vm._selectedTags).toEqual(["tag1"]);
    expect(wrapper.find("input#tag-tag1").element.checked).toBe(true);
  });

  it("Should set _selectedTags to empty array if selectedTags is empty string", async () => {
    await wrapper.setProps({
      selectedTags: "",
    });
    expect(wrapper.vm._selectedTags).toEqual([]);
  });

  it("Should emit update:selectedTags on checkbox click", async () => {
    const checkbox = wrapper.find("input#tag-tag3");
    await checkbox.setChecked();
    expect(checkbox.element.checked).toBe(true);
    expect(wrapper.emitted()["update:selectedTags"][0][0]).toEqual("tag1,tag3");
  });

  it("sortTags should sort tags to selected tags be at front", async () => {
    const tags = [{ name: "tag3" }, { name: "tag2" }, { name: "tag1" }];
    expect(wrapper.vm.sortTags(tags)).toEqual([
      { name: "tag1" },
      { name: "tag3" },
      { name: "tag2" },
    ]);
  });
});
