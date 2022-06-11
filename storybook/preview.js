import { app } from "@storybook/vue3";
import FontAwesomeIcon from "../src/font-awesome";
import store from "./store-mock";

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(store);
