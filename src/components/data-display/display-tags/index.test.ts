import { mount, DOMWrapper } from "@vue/test-utils";
import { createStore } from "vuex";
import CDisplayTags from "./index.vue";

describe("Select Tags Component", () => {
  let wrapper: any = null;
  let tags: DOMWrapper<HTMLElement>[];
  let store;

  beforeEach(async () => {
    store = createStore({
      state: {
        isDarkModeEnabled: false,
      },
    });

    global.settings.provide = {
      store,
    };

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
    await tags[0].trigger("click");
    expect(wrapper.emitted()["click"][0][0]).toEqual("tag1");
  });
});
