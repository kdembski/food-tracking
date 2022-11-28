import { mount } from "@vue/test-utils";
import CIcon from "./index.vue";

describe("Icon Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CIcon, { global: global.settings });
  });

  it("Should render component with type and size classes", async () => {
    expect(wrapper.classes()).toContain("icon--medium");
    expect(wrapper.classes()).toContain("icon--success");
  });

  it("getIconBasedOnType should return corrent icon based on type provided", async () => {
    expect(wrapper.vm.getIconBasedOnType("success")).toEqual("check");
    expect(wrapper.vm.getIconBasedOnType("error")).toEqual("times");
    expect(wrapper.vm.getIconBasedOnType("")).toEqual("");
  });
});
