import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  deleteSubjectsAPI,
  DeleteSubjectsParams,
  DeleteSubjectsResponse,
} from "api/messages/message";

function useDeleteSubjects(
  options?: UseMutationOptions<
    DeleteSubjectsResponse,
    AxiosError<ErrorResponse>,
    DeleteSubjectsParams
  >
) {
  return useMutation(
    (params: DeleteSubjectsParams) => deleteSubjectsAPI(params),
    options
  );
}

export default useDeleteSubjects;
