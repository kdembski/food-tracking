import CSelectMembers from "../../select-members/index.vue";

export default {
  title: "Controls/Select Members",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      selected: [],
    };
  },
  components: { CSelectMembers },
  template:
    '<CSelectMembers v-bind="args" v-model:selectedMembers="selected"></CSelectMembers>',
});

export const Default = Template.bind({});

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);
