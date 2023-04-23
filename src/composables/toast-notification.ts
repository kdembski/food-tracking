import { ToastNotification } from "@/types/components/feedback/toast-notification";
import { useStore } from "vuex";
import { v4 as uuid } from "uuid";
import { computed } from "vue";

export function useToastNotification() {
  const store = useStore();
  const toastNotifications = computed(() => {
    return store.state.toastNotifications;
  });

  const add = (
    type: string,
    message: string,
    action?: () => void,
    actionText?: string
  ) => {
    const toastNotification = {
      id: uuid(),
      type,
      message,
      action,
      actionText,
    };

    store.commit("unshiftToastNotification", toastNotification);

    setTimeout(() => {
      store.commit("popToastNotification");
    }, 3000);
  };

  const success = (
    message: string,
    action?: () => void,
    actionText?: string
  ) => {
    add("success", message, action, actionText);
  };

  const error = (message: string, action?: () => void, actionText?: string) => {
    add("error", message, action, actionText);
  };

  const remove = (id: string) => {
    const notificationIndex = toastNotifications.value.indexOf(
      toastNotifications.value.find(
        (notification: ToastNotification) => notification.id === id
      )
    );

    store.commit("spliceToastNotification", notificationIndex);
  };

  return {
    add,
    success,
    error,
    remove,
  };
}
