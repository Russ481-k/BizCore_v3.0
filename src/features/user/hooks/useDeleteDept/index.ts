import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  deleteDeptAPI,
  DeleteDeptParams,
  DeleteDeptResponse,
} from "api/department";

function useDeleteDept(
  options?: UseMutationOptions<
    DeleteDeptResponse,
    AxiosError<ErrorResponse>,
    DeleteDeptParams
  >
) {
  return useMutation(
    (params: DeleteDeptParams) => deleteDeptAPI(params),
    options
  );
}

export default useDeleteDept;
