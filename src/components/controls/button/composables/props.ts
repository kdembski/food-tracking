interface ButtonProps {
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
  variant: string;
  color: string;
  icon: string;
  fullWidth: boolean;
}

export function useButtonProps() {
  const buttonProps = {
    label: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "contained",
      validator: (value: string) => {
        return ["contained", "text"].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      default: "primary",
      validator: (value: string) => {
        return ["primary", "secondary"].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      default: "medium",
      validator: (value: string) => {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    icon: {
      type: String,
      default: "",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  };

  const getButtonProps = (props: ButtonProps): ButtonProps => {
    return {
      label: props.label,
      isLoading: props.isLoading,
      isDisabled: props.isDisabled,
      variant: props.variant,
      color: props.color,
      icon: props.icon,
      fullWidth: props.fullWidth,
    };
  };

  return {
    buttonProps,
    getButtonProps,
  };
}
