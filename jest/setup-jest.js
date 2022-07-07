const FontAwesomeIcon = require("@/font-awesome.ts");
require("../src/utils/removeDiacritics");

const settings = {
  components: {
    FontAwesomeIcon,
  },
};
global.settings = settings;

jest.mock("vue-inline-svg", () => () => jest.fn());

const layout = document.createElement("div");
layout.classList.add("layout-default");
document.body.appendChild(layout);
