import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  sendMMSConsultAPI,
  SendMMSConsultParams,
  SendMMSConsultResponse,
} from "api/two-way-consult/send";

function useSendMMSConsult(
  options?: UseMutationOptions<
    SendMMSConsultResponse,
    AxiosError<ErrorResponse>,
    SendMMSConsultParams
  >
) {
  return useMutation((params: SendMMSConsultParams) => {
    return sendMMSConsultAPI(params);
  }, options);
}

export default useSendMMSConsult;
