import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FontAwesomeIcon from "./font-awesome";
import "./utils/simplifyString";
import VueClickAway from "vue3-click-away";

const app = createApp(App);

app.use(router);
app.use(store);

app.use(VueClickAway);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
