import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  cancelReservedTwoWayMessageAPI,
  CancelReservedTwoWayMessageResponse,
} from "api/two-way-messages/two-way-message";

function useCancelReservedTwoWayMessage(
  options?: UseMutationOptions<
    CancelReservedTwoWayMessageResponse,
    AxiosError<ErrorResponse>,
    { id: number }
  >
) {
  return useMutation(
    (params: { id: number }) => cancelReservedTwoWayMessageAPI(params),
    options
  );
}

export default useCancelReservedTwoWayMessage;
