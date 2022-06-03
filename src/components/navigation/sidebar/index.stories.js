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
    { route: "", label: "Przepisy", icon: "utensils" },
    { route: "", label: "Składniki", icon: "cheese" },
    { route: "", label: "Kalendarz", icon: "calendar-days" },
    { route: "", label: "Lista zakupów", icon: "list" },
    { route: "", label: "Co zamawiamy?", icon: "truck" },
  ],
};
