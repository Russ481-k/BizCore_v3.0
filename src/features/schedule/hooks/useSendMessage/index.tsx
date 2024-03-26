import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { sendMessageAPI, SendMessageResponse } from "api/messages";
import SendData from "type/SendData";

function useSendMessage(
  options?: UseMutationOptions<
    SendMessageResponse,
    AxiosError<ErrorResponse>,
    SendData
  >
) {
  return useMutation((params: SendData) => {
    return sendMessageAPI(params);
  }, options);
}

export default useSendMessage;
