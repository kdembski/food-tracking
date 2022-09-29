import { app } from "@storybook/vue3";
import FontAwesomeIcon from "../src/font-awesome";
import store from "./store-mock";
import router from "./router-mock";
import "../src/utils/simplifyString";
import "../src/styles/_themes.scss";
import VueClickAway from "vue3-click-away";

app.use(VueClickAway);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(store);
app.use(router);
