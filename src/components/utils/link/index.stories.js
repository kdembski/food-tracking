import CLink from "./index.vue";

export default {
  title: "Utils/Link",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CLink },
  template: '<CLink v-bind="args"></CLink>',
});

export const Default = Template.bind({});
export const External = Template.bind({});
External.args = {
  external: true,
};
