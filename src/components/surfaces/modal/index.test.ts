import { mount } from "@vue/test-utils";
import CModal from "./index.vue";
import CButton from "@/components/controls/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

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
    expect(document.body.querySelector(".modal__overlay")).toBeTruthy();
  });

  it("Should close modal on close button click", async () => {
    const closeButton = wrapper.findAllComponents(CButton)[0];
    closeButton.trigger("click");
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should emit submit event and close modal on submit button click", async () => {
    const submitButton = wrapper.findAllComponents(CButton)[1];
    submitButton.trigger("click");
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
    expect(wrapper.emitted()["submit"]).toBeTruthy();
  });

  it("Should show loader if isSubmitting is true", async () => {
    await wrapper.setProps({
      isSubmitting: true,
    });
    expect(wrapper.findComponent(CLoader).exists()).toBe(true);
  });
});
