import { mount } from "@vue/test-utils";
import CTransition from "./index.vue";

describe("Transition Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CTransition, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
