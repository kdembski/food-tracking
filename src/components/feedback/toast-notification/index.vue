<script lang="ts">
import CIcon from "@/components/utils/icon/index.vue";
import CButton from "@/components/controls/buttons/button/index.vue";

export default {
  name: "CToastNotification",
  components: { CIcon, CButton },
};
</script>

<script setup lang="ts">
import { useToastNotification } from "@/composables/toast-notification";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
    validator: (value: string) => {
      return ["success", "error"].indexOf(value) !== -1;
    },
  },
  message: {
    type: String,
    default: "Message",
  },
  action: {
    type: Function,
    default: null,
  },
  actionText: {
    type: String,
    default: "Action",
  },
});

const toastNotification = useToastNotification();

const getTypeClass = () => {
  return "toast-notification--" + props.type;
};

const onRemoveButtonClick = () => {
  toastNotification.remove(props.id);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
