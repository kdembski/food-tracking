export interface TableColumn {
  label: string;
  value: string;
  isSortable?: boolean;
  getItemColumnValue?: (itemValue: unknown) => string | number;
}
