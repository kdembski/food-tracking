import CMultiInput from "./index.vue";
import CInput from "../input/index.vue";

export default {
  title: "Controls/Multi Input",
  component: CMultiInput,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      values: [1, 2, 3],
    };
  },
  components: { CMultiInput, CInput },
  template: `
  <CMultiInput v-model="values" v-bind="args" style="width: 500px">
    <template #default="{ values, index }">
      <CInput v-model="values[index]" :errorMessage="args.errorMessage"/>
    </template>
  </CMultiInput>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const Invalid = Template.bind({});
Invalid.args = Object.assign(
  { errorMessage: "Field is required" },
  Default.args
);

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);
