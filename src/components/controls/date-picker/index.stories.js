import { ref } from "vue";
import CDatePicker from "./index.vue";

export default {
  title: "Controls/Date Picker",
};

const Template = (args) => ({
  setup() {
    const selected = ref([]);
    return { args, selected };
  },
  components: { CDatePicker },
  template: `<CDatePicker v-bind="args" v-model="selected"></CDatePicker>`,
});

export const Default = Template.bind({});
