import { mount } from "@vue/test-utils";
import CDraggableButton from "@/components/controls/buttons/draggable-button/index.vue";

describe("Draggable Button Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    localStorage.setItem("test-position", "500");
    wrapper = mount(CDraggableButton, {
      attrs: {
        id: "test",
      },
      global: global.settings,
    });
  });

  it("Should set currentPageY when onTouchStart is called", async () => {
    wrapper.vm.onTouchStart({ changedTouches: [{ pageY: 10 }] });
    expect(wrapper.vm.currentPageY).toEqual(10);
  });

  it("Should set positionY based on current position and touch move", async () => {
    wrapper.vm.onTouchStart({ changedTouches: [{ pageY: 10 }] });
    wrapper.vm.onTouchMove({ changedTouches: [{ pageY: 5 }] });
    expect(wrapper.vm.positionY).toEqual(495);
    expect(wrapper.vm.style).toEqual("transform: translateY(495px)");
  });

  it("Should not set positionY if value is greater than max or lower than min", async () => {
    wrapper.vm.onTouchStart({ changedTouches: [{ pageY: 10 }] });

    wrapper.vm.onTouchMove({ changedTouches: [{ pageY: 1000 }] });
    expect(wrapper.vm.positionY).toEqual(500);

    wrapper.vm.onTouchMove({ changedTouches: [{ pageY: -1000 }] });
    expect(wrapper.vm.positionY).toEqual(500);
  });

  it("Should save positionY to local storage", async () => {
    wrapper.vm.setPositionToStorage();
    expect(localStorage.__STORE__["test-position"]).toBe("500");
  });

  it("Should set positionY from local storage", async () => {
    localStorage.setItem("test-position", "10");
    wrapper.vm.setPositionFromStorage();
    expect(wrapper.vm.positionY).toBe(10);

    localStorage.removeItem("test-position");
    wrapper.vm.setPositionFromStorage();
    expect(wrapper.vm.positionY).toBe(10);
  });
});
