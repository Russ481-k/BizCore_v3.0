import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  cancelReservedMessageAPI,
  CancelReservedMessageResponse,
} from "api/messages/message";

function useCancelReservedMessage(
  options?: UseMutationOptions<
    CancelReservedMessageResponse,
    AxiosError<ErrorResponse>,
    { id: number }
  >
) {
  return useMutation(
    (params: { id: number }) => cancelReservedMessageAPI(params),
    options
  );
}

export default useCancelReservedMessage;
