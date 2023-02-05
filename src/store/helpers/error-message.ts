import { ApiError } from "@/types/api";
import { State } from "@/types/store";
import { AxiosError } from "axios";

export const getErrorMessage = (error: AxiosError<ApiError>) => {
  const errorMessage: string | undefined =
    error.response?.data?.message || error.code;

  return errorMessage;
};

export const showDefualtErrorNotification = (
  error: AxiosError<ApiError>,
  rootState: State
) => {
  rootState.toastNotification?.error(
    "Wystąpił błąd: " + getErrorMessage(error) + ". Spróbuj ponownie poźniej."
  );
};
