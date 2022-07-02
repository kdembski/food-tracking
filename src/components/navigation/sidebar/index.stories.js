import CSidebar from "./index.vue";

export default {
  title: "Navigation/Sidebar",
  component: CSidebar,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CSidebar },
  template: '<CSidebar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { route: "/recipes", label: "Przepisy", icon: "utensils" },
    { route: "/ordered", label: "Zamawiane?", icon: "box-open" },
    { route: "/", label: "Składniki", icon: "cheese" },
    { route: "/", label: "Kalendarz", icon: "calendar-days" },
    { route: "/", label: "Zakupy", icon: "list" },
    { route: "/", label: "Statystyki", icon: "chart-line" },
    { route: "/settings", label: "Ustawienia", icon: "gear" },
  ],
};
