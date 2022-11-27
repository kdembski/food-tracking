require("../src/utils/simplifyString");
require("jest-localstorage-mock");
const ClickAway = require("vue3-click-away");
const Tooltip = require("../src/directives/tooltip");

const settings = {
  stubs: {
    FontAwesomeIcon: {
      template: "<svg />",
    },
  },
  directives: {
    ClickAway,
    Tooltip,
  },
};
global.settings = settings;

const mobileDropdownsContainer = document.createElement("div");
mobileDropdownsContainer.id = "mobile-dropdowns-container";
document.body.appendChild(mobileDropdownsContainer);

process.env.VUE_APP_SERVICE_URL = "service";
