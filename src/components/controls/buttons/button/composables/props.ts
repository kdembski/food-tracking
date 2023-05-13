interface ButtonProps {
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
  variant: string;
  color: string;
  size: string;
  icon: string;
  fullWidth: boolean;
  enableMobileResize: boolean;
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
        return ["contained", "outlined", "text"].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      default: "primary",
      validator: (value: string) => {
        return ["primary", "secondary", "error"].indexOf(value) !== -1;
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
      type: [String, Array],
      default: "",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    enableMobileResize: {
      type: Boolean,
      default: true,
    },
  };

  const getButtonProps = (props: ButtonProps): ButtonProps => {
    return {
      label: props.label,
      isLoading: props.isLoading,
      isDisabled: props.isDisabled,
      variant: props.variant,
      color: props.color,
      size: props.size,
      icon: props.icon,
      fullWidth: props.fullWidth,
      enableMobileResize: props.enableMobileResize,
    };
  };

  return {
    buttonProps,
    getButtonProps,
  };
}
