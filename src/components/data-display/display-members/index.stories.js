import CDisplayMembers from "./index.vue";

export default {
  title: "Data Display/Display Members",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CDisplayMembers },
  template: '<CDisplayMembers v-bind="args"></CDisplayMembers>',
});

export const Default = Template.bind({});
Default.args = {
  memberIds: [1, 2],
};
