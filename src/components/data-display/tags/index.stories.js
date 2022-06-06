import CTags from "./index.vue";

export default {
  title: "Data Display/Tags",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CTags },
  template: '<CTags v-bind="args"></CTags>',
});

export const Default = Template.bind({});
Default.args = {
  tags: "default, vege, hot, szybki",
};
