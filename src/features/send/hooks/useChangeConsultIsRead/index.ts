import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  changeConsultIsReadAPI,
  ChangeConsultIsReadParams,
  ChangeConsultIsReadResponse,
} from "api/two-way-consult";

function useChangeConsultIsRead(
  options?: UseMutationOptions<
    ChangeConsultIsReadResponse,
    AxiosError<ErrorResponse>,
    ChangeConsultIsReadParams
  >
) {
  return useMutation(
    (params: ChangeConsultIsReadParams) => changeConsultIsReadAPI(params),
    options
  );
}

export default useChangeConsultIsRead;
