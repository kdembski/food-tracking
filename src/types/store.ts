import { TooltipConfig } from "./components/tooltip";
import { ToastNotification } from "@/types/components/toast-notification";

export interface State {
  theme: string;
  primaryColor: string;
  mainContainerScrollValue: number;
  toastNotifications: ToastNotification[];
  isTooltipOpen: boolean;
  tooltipConfig: TooltipConfig;
  isMobileDropdownOpen: boolean;
}
