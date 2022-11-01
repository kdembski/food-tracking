import { mount } from "@vue/test-utils";
import CSelectTags from "./index.vue";

describe("Select Tags Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CSelectTags, {
      props: {
        tags: [
          {
            name: "tag1",
            count: 12,
          },
          {
            name: "tag2",
            count: 23,
          },
          {
            name: "tag3",
          },
        ],
        selectedTags: "tag1",
      },
      global: global.settings,
    });
  });

  it("Should set _selectedTags based on selectedTags props", async () => {
    expect(wrapper.vm._selectedTags).toEqual(["tag1"]);
    expect(wrapper.find("input#tag-tag1").element.checked).toBe(true);
  });

  it("Should set _tags based on tags props", async () => {
    expect(wrapper.vm._tags).toEqual([
      {
        name: "tag1",
        count: 12,
      },
      {
        name: "tag2",
        count: 23,
      },
      {
        name: "tag3",
      },
    ]);
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
    await wrapper.setProps({
      enableSortOutSelected: true,
    });
    const tags = [{ name: "tag3" }, { name: "tag2" }, { name: "tag1" }];
    expect(wrapper.vm.sortTags(tags)).toEqual([
      { name: "tag1" },
      { name: "tag3" },
      { name: "tag2" },
    ]);
  });

  it("Should show loader if isLoading is true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(".select-tags-loader").exists()).toBe(true);
  });

  it("addTagToSelected should add tag to selected if not already added", async () => {
    await wrapper.vm.addTagToSelected("");
    await wrapper.vm.addTagToSelected("tag1");
    expect(wrapper.emitted()["update:selectedTags"]).toBeFalsy();

    await wrapper.vm.addTagToSelected("tag2");
    expect(wrapper.emitted()["update:selectedTags"][0][0]).toEqual("tag1,tag2");
  });

  it("getTagsOptions should return tags without selected in form of dropdown options", async () => {
    expect(wrapper.vm.getTagsOptions()).toStrictEqual([
      {
        value: "tag2",
        label: "tag2",
      },
      {
        value: "tag3",
        label: "tag3",
      },
    ]);
  });

  it("addTagToOptions should add tag to avialable tags", async () => {
    await wrapper.vm.addTagToOptions({ label: "tag4" });
    expect(wrapper.emitted()["update:tags"][0][0]).toEqual([
      {
        name: "tag1",
        count: 12,
      },
      {
        name: "tag2",
        count: 23,
      },
      {
        name: "tag3",
      },
      {
        name: "tag4",
      },
    ]);
  });
});
