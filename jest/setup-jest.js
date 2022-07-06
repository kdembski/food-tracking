const FontAwesomeIcon = require("@/font-awesome.ts");

const settings = {
  components: {
    FontAwesomeIcon,
  },
};
global.settings = settings;

jest.mock("vue-inline-svg", () => () => jest.fn());
