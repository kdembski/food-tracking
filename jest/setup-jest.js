require("../src/utils/simplifyString");
require("jest-localstorage-mock");

const settings = {
  stubs: {
    FontAwesomeIcon: {
      template: "<svg />",
    },
  },
};
global.settings = settings;

jest.mock("vue-inline-svg", () => () => jest.fn());

const layout = document.createElement("div");
layout.classList.add("layout-default");
document.body.appendChild(layout);
