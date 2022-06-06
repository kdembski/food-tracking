interface FieldTemplateProps {
  label: string;
  isDisabled: boolean;
  errorMessage: string;
}

export function useFieldProps() {
  const fieldProps = {
    modelValue: {
      type: String,
      default: "",
    },
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
  };

  const getFieldTemplateProps = (
    props: FieldTemplateProps
  ): FieldTemplateProps => {
    return {
      label: props.label,
      isDisabled: props.isDisabled,
      errorMessage: props.errorMessage,
    };
  };

  return {
    fieldProps,
    getFieldTemplateProps,
  };
}
