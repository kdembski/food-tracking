export interface ToastNotification {
  id: string;
  type: string;
  message: string;
  action: () => void;
  actionText: string;
}
