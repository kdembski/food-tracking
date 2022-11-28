import { mount } from "@vue/test-utils";
import CTags from "./index.vue";

describe("Tags Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CTags, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
