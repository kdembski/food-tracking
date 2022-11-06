import { mount } from "@vue/test-utils";
import CTooltip from "./index.vue";

describe("Tooltip Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CTooltip, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
