import CHorizontalTabs from "./index.vue";

export default {
  title: "Navigation/Horizontal Tabs",
  component: CHorizontalTabs,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      value: "item-1",
    };
  },
  components: { CHorizontalTabs },
  template: '<CHorizontalTabs v-model="value" v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { code: "item-1", label: "Item 1" },
    { code: "item-2", label: "Item 2" },
    { code: "item-3", label: "Item 3" },
  ],
  id: "test-id",
};

export const WithCount = Template.bind({});
WithCount.args = {
  items: [
    { code: "item-1", label: "Item 1", count: 25 },
    { code: "item-2", label: "Item 2" },
    { code: "item-3", label: "Item 3" },
  ],
  id: "test-id",
};
