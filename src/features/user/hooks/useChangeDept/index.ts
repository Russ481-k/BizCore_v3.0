import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  changeDeptAPI,
  ChangeDeptParams,
  ChangeDeptResponse,
} from "api/department";

function useChangeDept(
  options?: UseMutationOptions<
    ChangeDeptResponse,
    AxiosError<ErrorResponse>,
    ChangeDeptParams
  >
) {
  return useMutation(
    (params: ChangeDeptParams) => changeDeptAPI(params),
    options
  );
}

export default useChangeDept;
