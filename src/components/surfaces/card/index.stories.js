import CCard from "./index.vue";

export default {
  title: "Surfaces/Card",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CCard },
  template: '<CCard v-bind="args" > Content </CCard>',
});

export const Default = Template.bind({});
