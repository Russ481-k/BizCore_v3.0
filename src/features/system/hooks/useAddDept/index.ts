import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import { addDeptAPI, AddDeptParams, AddDeptResponse } from "api/department";

function useAddDept(
  options?: UseMutationOptions<
    AddDeptResponse,
    AxiosError<ErrorResponse>,
    AddDeptParams
  >
) {
  return useMutation((params: AddDeptParams) => addDeptAPI(params), options);
}

export default useAddDept;
