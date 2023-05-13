import { shallowMount } from "@vue/test-utils";
import CSelectTags from "@/components/controls/custom/select-tags/default/index.vue";

describe("Select Tags Default Component", () => {
  let wrapper: any;
  let input: any;
  let newTag: any;

  beforeEach(async () => {
    wrapper = shallowMount(CSelectTags, {
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
  });

  it("Should render pill for each selected tag", async () => {
    expect(wrapper.findAll("div.select-tags__pill").length).toEqual(1);
  });

  it("Should add tag to selected and clear values on onModelValueUpdate call", async () => {
    wrapper.vm.selectedValue = "test";
    wrapper.vm.inputValue = "test";

    await wrapper.vm.onModelValueUpdate("tag2");
    expect(wrapper.emitted()["update:selectedTags"][0][0]).toEqual("tag1,tag2");
    expect(wrapper.vm.selectedValue).toEqual(null);
    expect(wrapper.vm.inputValue).toEqual("");
  });

  it("Should remove tag from selected on removeTagFromSelected call", async () => {
    await wrapper.vm.removeTagFromSelected("tag1");
    expect(wrapper.emitted()["update:selectedTags"][0][0]).toEqual("");
  });

  it("Should add tag to selected on addNewTag call", async () => {
    await wrapper.vm.addNewTag("tag2");
    expect(wrapper.emitted()["update:selectedTags"][0][0]).toEqual("tag1,tag2");
  });

  it("Should return tag options based on tags prop from getTagOptions", async () => {
    expect(wrapper.vm.getTagOptions()).toEqual([
      {
        label: "tag2",
        value: "tag2",
      },
      {
        label: "tag3",
        value: "tag3",
      },
    ]);
  });

  it("Should set input padding left based on selected container width", async () => {
    const input = { style: { paddingLeft: undefined } };

    await wrapper.vm.updateInputPadding();
    expect(input.style.paddingLeft).toEqual(undefined);

    await wrapper.vm.updateInputPadding(input);
    expect(input.style.paddingLeft).toEqual("0px");
  });
});
