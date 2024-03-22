import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  sendTwoWayMessageAPI,
  SendTwoWayMessageResponse,
} from "api/two-way-messages";

function useSendTwoWayMessage(
  options?: UseMutationOptions<
    SendTwoWayMessageResponse,
    AxiosError<ErrorResponse>,
    { id: number; reqDate: string | null }
  >
) {
  return useMutation((params: { id: number; reqDate: string | null }) => {
    return sendTwoWayMessageAPI(params);
  }, options);
}

export default useSendTwoWayMessage;
