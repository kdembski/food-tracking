import { useToastNotification } from "@/composables/toast-notification";
import { TooltipConfig } from "./components/feedback/tooltip";
import { ToastNotification } from "@/types/components/feedback/toast-notification";

export interface State {
  theme: string;
  primaryColor: string;
  mainContainerScrollValue: number;
  toastNotifications: ToastNotification[];
  isTooltipOpen: boolean;
  tooltipConfig: TooltipConfig;
  isMobileDropdownOpen: boolean;
  toastNotification: ReturnType<typeof useToastNotification> | null;
}
