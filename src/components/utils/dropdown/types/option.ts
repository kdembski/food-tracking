export interface DropdownOption<T = string | number> {
  value: T;
  label: string;
  icon?: string;
  action?: () => void;
}
