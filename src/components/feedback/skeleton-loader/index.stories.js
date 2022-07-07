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
  template: '<CSkeletonLoader v-bind="args" style="height: 50px" />',
});

export const Default = Template.bind({});
Default.args = {
  itemsCount: 3,
};
