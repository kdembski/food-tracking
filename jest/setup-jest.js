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

const layout = document.createElement("div");
layout.classList.add("default-layout");
document.body.appendChild(layout);
