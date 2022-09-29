require("../src/utils/simplifyString");
require("jest-localstorage-mock");
const ClickAway = require("vue3-click-away");

const settings = {
  stubs: {
    FontAwesomeIcon: {
      template: "<svg />",
    },
  },
  directives: {
    ClickAway,
  },
};
global.settings = settings;

const layout = document.createElement("div");
layout.classList.add("default-layout");
document.body.appendChild(layout);
