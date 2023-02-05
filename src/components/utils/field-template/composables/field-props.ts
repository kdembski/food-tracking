interface FieldTemplateProps {
  label: string;
  isDisabled: boolean;
  errorMessage: string;
  icon: string;
  isLoading: boolean;
  isSuccessful: boolean;
  isRequired: boolean;
}

export function useFieldProps() {
  const fieldProps = {
    label: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isSuccessful: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  };

  const getFieldTemplateProps = (
    props: FieldTemplateProps
  ): FieldTemplateProps => {
    return {
      label: props.label,
      isDisabled: props.isDisabled,
      errorMessage: props.errorMessage,
      icon: props.icon,
      isLoading: props.isLoading,
      isSuccessful: props.isSuccessful,
      isRequired: props.isRequired,
    };
  };

  return {
    fieldProps,
    getFieldTemplateProps,
  };
}
