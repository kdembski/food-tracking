import { DropdownOption } from "@/types/components/utils/dropdown";

interface DropdownProps {
  isOpen: boolean;
  options: Array<DropdownOption>;
  disabledOptions: string[] | number[];
  getOptionClass: () => string;
  searchPhrase: string;
  isLoading: boolean;
}

export function useDropdownProps() {
  const dropdownProps = {
    isOpen: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as () => Array<DropdownOption>,
      default: () => [],
    },
    disabledOptions: {
      type: Array,
      default: () => [],
    },
    getOptionClass: {
      type: Function,
      default: () => null,
    },
    searchPhrase: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    onClickAway: {
      type: Function,
      default: null,
    },
  };

  const getDropdownProps = (props: DropdownProps): DropdownProps => {
    return {
      isOpen: props.isOpen,
      options: props.options,
      disabledOptions: props.disabledOptions,
      getOptionClass: props.getOptionClass,
      searchPhrase: props.searchPhrase,
      isLoading: props.isLoading,
    };
  };

  return {
    dropdownProps,
    getDropdownProps,
  };
}
