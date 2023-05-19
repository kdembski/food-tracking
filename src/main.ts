import { createApp } from "vue";
import App from "./app/index.vue";
import router from "./router";
import store from "./store";
import FontAwesomeIcon from "./font-awesome";
import "./utils/simplifyString";
import VueClickAway from "vue3-click-away";
import { useTooltipDirective } from "./directives/tooltip";

const app = createApp(App);

app.use(router);
app.use(store);

app.use(VueClickAway);
app.component("FontAwesomeIcon", FontAwesomeIcon);

const { tooltipDirective } = useTooltipDirective(store);
app.directive("tooltip", tooltipDirective);

app.mount("#app");
