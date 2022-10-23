import CToastNotification from "./index.vue";

export default {
  title: "Feedback/Toast Notification",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CToastNotification },
  template:
    '<CToastNotification v-bind="args" style="max-width: 350px"></CToastNotification>',
});

export const Success = Template.bind({});
Success.args = {
  type: "success",
  message: "Udało sie dodać przepis do kalendzarza.",
  action: () => {
    alert("Action");
  },
  actionText: "Przejdz do kalendarza",
};

export const Error = Template.bind({});
Error.args = {
  type: "error",
};
