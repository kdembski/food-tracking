import { ref } from "vue";
import CModal from "./index.vue";

export default {
  title: "Surfaces/Modal",
};

const Template = (args) => ({
  setup() {
    const isOpen = ref(false);
    return { args, isOpen };
  },
  components: { CModal },
  template: `<button @click="isOpen = true">Open</button>
    <CModal v-bind="args" v-model:isOpen="isOpen">Content</CModal>`,
});

export const Default = Template.bind({});
export const isSubmitting = Template.bind({});
isSubmitting.args = {
  isSubmitting: true,
};
