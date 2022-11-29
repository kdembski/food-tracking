import { mount } from "@vue/test-utils";
import CFieldTemplate from "@/components/utils/field-template/index.vue";

describe("Field Template Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CFieldTemplate, { global: global.settings });
  });

  it("Should add invalid class if errorMessage prop is provided", async () => {
    expect(wrapper.classes()).not.toContain("field--invalid");
    await wrapper.setProps({
      errorMessage: "test",
    });
    expect(wrapper.classes()).toContain("field--invalid");
  });

  it("Should add successful class if isSuccessful prop is true", async () => {
    expect(wrapper.classes()).not.toContain("field--successful");
    await wrapper.setProps({
      isSuccessful: true,
    });
    expect(wrapper.classes()).toContain("field--successful");
  });

  it("Should add with-left-icon class if icon prop is provided", async () => {
    expect(wrapper.classes()).not.toContain("field--with-left-icon");
    await wrapper.setProps({
      icon: "plus",
    });
    expect(wrapper.classes()).toContain("field--with-left-icon");
  });

  it("Should add with-right-icon and disabled classes if isLoading prop is true", async () => {
    expect(wrapper.classes()).not.toContain("field--with-right-icon");
    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.classes()).toContain("field--with-right-icon");
    expect(wrapper.classes()).toContain("field--disabled");
  });

  it("Should add disabled class if isDisabled prop is true", async () => {
    expect(wrapper.classes()).not.toContain("field--disabled");
    await wrapper.setProps({
      isDisabled: true,
    });
    expect(wrapper.classes()).toContain("field--disabled");
  });

  it("Should add with-label class if label prop is provided", async () => {
    expect(wrapper.classes()).not.toContain("field--with-label");
    await wrapper.setProps({
      label: "test",
    });
    expect(wrapper.classes()).toContain("field--with-label");
  });

  it("Should show error message if errorMessage prop is provided", async () => {
    await wrapper.setProps({
      errorMessage: "test",
    });
    expect(wrapper.find("p.field__error-message").exists()).toBe(true);
  });

  it("Should render success icon if isSuccessful prop is true", async () => {
    await wrapper.setProps({
      isSuccessful: true,
    });
    expect(wrapper.find(".icon--success").exists()).toBe(true);
  });

  it("Should render left icon if icon prop is provided", async () => {
    await wrapper.setProps({
      icon: "plus",
    });
    expect(wrapper.find(".field__left-icon").exists()).toBe(true);
  });

  it("Should render right icon if isLoading prop is true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(".field__right-icon").exists()).toBe(true);
  });

  it("Should render label if label prop is provided", async () => {
    await wrapper.setProps({
      label: "test",
    });
    expect(wrapper.find(".field__label").exists()).toBe(true);
  });
});
