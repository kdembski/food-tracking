export interface ShoppingCustomItem {
  id: number;
  name: string;
}

export interface ShoppingCustomItemOption {
  id: number;
  name: string;
}

export interface ShoppingCustomItemState {
  options: ShoppingCustomItemOption[] | null;
  isLoadingOptions: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
}
