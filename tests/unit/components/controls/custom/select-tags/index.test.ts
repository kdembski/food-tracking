import { mount } from "@vue/test-utils";
import CSelectTags from "@/components/controls/custom/select-tags/pills/index.vue";

describe("Select Tags Component", () => {
  let wrapper: any;
  let input: any;
  let newTag: any;

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
        enableAddingTags: true,
      },
      global: global.settings,
    });

    input = wrapper.find(".select-tags__input > input");
    newTag = wrapper.find(".select-tags__new-tag");
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

  it("sortSelectedToFront should sort tags to selected tags be at front", async () => {
    await wrapper.setProps({
      enableSortingSelectedToFront: true,
    });
    const tags = [{ name: "tag3" }, { name: "tag2" }, { name: "tag1" }];
    expect(wrapper.vm.sortSelectedToFront(tags)).toEqual([
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

  it("addTagToOptions should add tag to aviailable tags", async () => {
    await wrapper.vm.addTagToOptions("tag1");
    expect(wrapper.emitted()["update:tags"]).toBeFalsy();

    await wrapper.vm.addTagToOptions("tag4");
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

  it("Should show new tag if enableAddingTags prop is true", async () => {
    expect(newTag.exists()).toBe(true);

    const newTagText = newTag.find("p");
    expect(newTagText.exists()).toBe(false);
  });

  it("Should filter tags based on search phrase value", async () => {
    await input.setValue("tag3");
    expect(
      wrapper.vm.filterBySearchPhrase([
        {
          name: "tag2",
        },
        {
          name: "tag3",
        },
      ])
    ).toEqual([
      {
        name: "tag3",
      },
    ]);
  });

  it("Should clear search phrase after tag selection", async () => {
    await input.setValue("tag3");
    expect(wrapper.vm.searchPhrase).toEqual("tag3");

    await newTag.trigger("click");
    expect(wrapper.vm.searchPhrase).toEqual("");
  });

  it("Should add tag to selected and options on new tag click", async () => {
    await newTag.trigger("click");
    await input.setValue("tag4");

    const newTagText = newTag.find("p");
    expect(newTagText.text()).toEqual("tag4...");

    await newTag.trigger("click");
    expect(wrapper.emitted()["update:selectedTags"][0][0]).toEqual("tag1,tag4");
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
