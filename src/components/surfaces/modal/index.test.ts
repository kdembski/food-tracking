import { mount } from "@vue/test-utils";
import CModal from "./index.vue";

describe("Modal Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CModal, {
      props: {
        isOpen: true,
      },
      global: global.settings,
    });
  });

  it("Should render component and show modal if isOpen is true", async () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".modal__overlay").exists()).toBe(true);
  });

  it("Should close modal on close button click", async () => {
    const closeButton = wrapper.find(".modal__header").find("button");
    closeButton.trigger("click");
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should emit submit event and close modal on submit button click", async () => {
    const submitButton = wrapper.find(".modal__footer").find("button");
    submitButton.trigger("click");
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
    expect(wrapper.emitted()["submit"]).toBeTruthy();
  });

  it("Should show loader if isSubmitting is true", async () => {
    await wrapper.setProps({
      isSubmitting: true,
    });
    expect(wrapper.find(".loader").exists()).toBe(true);
  });
});
