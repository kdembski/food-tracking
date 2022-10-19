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

const mobileDropdownsContainer = document.createElement("div");
mobileDropdownsContainer.id = "mobile-dropdowns-container";
document.body.appendChild(mobileDropdownsContainer);
