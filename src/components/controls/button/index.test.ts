import { mount } from "@vue/test-utils";
import CButton from "./index.vue";

describe("Button Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CButton);
  });

  it("should exists", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
