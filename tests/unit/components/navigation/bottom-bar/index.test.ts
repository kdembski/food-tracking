import { ref } from "vue";
import { shallowMount } from "@vue/test-utils";
import CBottomBar from "@/components/navigation/bottom-bar/index.vue";
import { mount as composableMount } from "vue-composable-tester";
import { useSwipeScreen } from "@/components/navigation/bottom-bar/composables/swipe-screen";

describe("Bottom Bar Component", () => {
  let wrapper: any;
  let bottomBarWrapper: any;
  let slideRight = jest.fn();
  let slideLeft = jest.fn();
  const swipeScreenComposable = composableMount(() =>
    useSwipeScreen(slideLeft, slideRight, ref(0), -100, 100)
  ).result as any;

  beforeEach(async () => {
    wrapper = shallowMount(CBottomBar, {
      props: {
        items: [
          { route: "/recipes", label: "Przepisy", icon: "utensils" },
          { route: "/ordered", label: "Zamawiane?", icon: "box-open" },
          { route: "/", label: "Składniki", icon: "cheese" },
          { route: "/", label: "Kalendarz", icon: "calendar-days" },
          { route: "/", label: "Zakupy", icon: "list" },
          { route: "/", label: "Statystyki", icon: "chart-line" },
        ],
      },
      global: global.settings,
    });

    bottomBarWrapper = wrapper.find("bottom-bar__wrapper");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should router link for each item", async () => {
    const routerLinks = wrapper.findAll("router-link-stub");
    expect(routerLinks.length).toEqual(6);
  });

  it("slideLeft should increment activeListIndex if lower or equal than listLimits length", async () => {
    expect(wrapper.vm.activeListIndex).toEqual(0);
    await wrapper.vm.slideLeft();
    expect(wrapper.vm.activeListIndex).toEqual(1);
    await wrapper.vm.slideLeft();
    expect(wrapper.vm.activeListIndex).toEqual(1);
  });

  it("slideRight should decrement activeListIndex if greater than 0", async () => {
    await wrapper.vm.slideLeft();
    expect(wrapper.vm.activeListIndex).toEqual(1);
    await wrapper.vm.slideRight();
    expect(wrapper.vm.activeListIndex).toEqual(0);
    await wrapper.vm.slideRight();
    expect(wrapper.vm.activeListIndex).toEqual(0);
  });

  it("Should return computed style based on wrapperTranslateX value", async () => {
    expect(swipeScreenComposable.style.value).toEqual("");
    await swipeScreenComposable.onTouchmove({
      changedTouches: [{ screenX: 10 }],
    });
    expect(swipeScreenComposable.style.value).toEqual(
      "transform: translateX(10px); transition: none"
    );
  });

  it("Should set wrapperTranslateX on onTouchMove call", async () => {
    await swipeScreenComposable.onTouchstart({
      changedTouches: [{ screenX: 10 }],
    });
    await swipeScreenComposable.onTouchmove({
      changedTouches: [{ screenX: 20 }],
    });
    expect(swipeScreenComposable.wrapperTranslateX.value).toEqual("10px");

    await swipeScreenComposable.onTouchmove({
      changedTouches: [{ screenX: 120 }],
    });
    expect(swipeScreenComposable.wrapperTranslateX.value).toEqual("100px");

    await swipeScreenComposable.onTouchmove({
      changedTouches: [{ screenX: -120 }],
    });
    expect(swipeScreenComposable.wrapperTranslateX.value).toEqual("-100px");
  });

  it("Should not swipe screen if touchDifferenceX is less than 50", async () => {
    await swipeScreenComposable.onTouchend({
      changedTouches: [{ screenX: 10 }],
    });
    expect(slideLeft).toHaveBeenCalledTimes(0);
    expect(slideRight).toHaveBeenCalledTimes(0);
  });

  it("Should slide screen left if touchDifferenceX is greater than 0", async () => {
    await swipeScreenComposable.onTouchend({
      changedTouches: [{ screenX: -100 }],
    });
    expect(slideLeft).toHaveBeenCalledTimes(1);
    expect(slideRight).toHaveBeenCalledTimes(0);
  });

  it("Should slide screen right if touchDifferenceX is lower than 0", async () => {
    await swipeScreenComposable.onTouchend({
      changedTouches: [{ screenX: 100 }],
    });
    expect(slideLeft).toHaveBeenCalledTimes(0);
    expect(slideRight).toHaveBeenCalledTimes(1);
  });
});
