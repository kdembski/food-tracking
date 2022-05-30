import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FontAwesomeIcon from "./font-awesome";

const app = createApp(App);
app.use(router);
app.use(store);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
