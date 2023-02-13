import { computed } from "vue";
import { useStore } from "vuex";

export function useStoredErrors(storeModuleName: string) {
  const store = useStore();

  const errors = computed(() => store.getters[storeModuleName + "/errors"]);

  const getErrorMessage = (path: string[]) => {
    let error = errors.value;

    path.forEach((item) => {
      error = error?.[item];
    });

    return error?.message;
  };

  const clearError = (path: string[]) => {
    if (!errors.value) {
      return;
    }

    let error = errors.value;
    const pathLength = path.length;

    path.forEach((item, index) => {
      if (index === pathLength - 1) {
        error[path[pathLength - 1]] = undefined;
      }

      error = error?.[item];
    });
  };

  const clearAllErrors = () => {
    store.commit(storeModuleName + "/setErrors", null);
  };

  return { errors, getErrorMessage, clearError, clearAllErrors };
}
