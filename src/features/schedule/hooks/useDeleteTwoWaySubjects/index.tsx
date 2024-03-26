import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  deleteTwoWaySubjectsAPI,
  DeleteTwoWaySubjectsParams,
  DeleteTwoWaySubjectsResponse,
} from "api/two-way-messages/two-way-message";

function useDeleteTwoWaySubjects(
  options?: UseMutationOptions<
    DeleteTwoWaySubjectsResponse,
    AxiosError<ErrorResponse>,
    DeleteTwoWaySubjectsParams
  >
) {
  return useMutation(
    (params: DeleteTwoWaySubjectsParams) => deleteTwoWaySubjectsAPI(params),
    options
  );
}

export default useDeleteTwoWaySubjects;
