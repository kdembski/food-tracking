import { mount, DOMWrapper } from "@vue/test-utils";
import CDisplayTags from "./index.vue";

describe("Display Tags Component", () => {
  let wrapper: any = null;
  let tags: DOMWrapper<HTMLElement>[];
  const onClick = jest.fn();

  beforeEach(async () => {
    wrapper = mount(CDisplayTags, {
      props: { tags: "tag1,tag2,tag3" },
      global: global.settings,
    });

    tags = wrapper.findAll(".tag");
  });

  it("Should render tags", async () => {
    expect(tags.length).toEqual(3);
  });

  it("Should emit click event on tag click", async () => {
    await wrapper.setProps({
      onClick,
    });
    await tags[0].trigger("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Should not add hover class if onClick is not set", async () => {
    expect(wrapper.vm.getWithHoverClass()).toEqual("");
    await wrapper.setProps({
      onClick,
    });
    expect(wrapper.vm.getWithHoverClass()).toEqual("tag--with-hover");
  });
});
