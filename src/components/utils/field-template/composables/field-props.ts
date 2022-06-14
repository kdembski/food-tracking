interface FieldTemplateProps {
  label: string;
  isDisabled: boolean;
  errorMessage: string;
  icon: string;
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
  };

  const getFieldTemplateProps = (
    props: FieldTemplateProps
  ): FieldTemplateProps => {
    return {
      label: props.label,
      isDisabled: props.isDisabled,
      errorMessage: props.errorMessage,
      icon: props.icon,
    };
  };

  return {
    fieldProps,
    getFieldTemplateProps,
  };
}
