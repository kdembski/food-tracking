import { mount } from "@vue/test-utils";
import CLink from "./index.vue";

describe("Link Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CLink, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
