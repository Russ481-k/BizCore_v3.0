import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  sendConsultAPI,
  SendConsultParams,
  SendConsultResponse,
} from "api/two-way-consult/send";

function useSendConsult(
  options?: UseMutationOptions<
    SendConsultResponse,
    AxiosError<ErrorResponse>,
    SendConsultParams
  >
) {
  return useMutation((params: SendConsultParams) => {
    return sendConsultAPI(params);
  }, options);
}

export default useSendConsult;
