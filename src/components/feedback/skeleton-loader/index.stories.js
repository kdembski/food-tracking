import CSkeletonLoader from "./index.vue";

export default {
  title: "Feedback/Skeleton Loader",
  component: CSkeletonLoader,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CSkeletonLoader },
  template: '<CSkeletonLoader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  itemsCount: 3,
};
