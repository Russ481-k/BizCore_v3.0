import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  DeleteTemplateGroupResponse,
  deleteTemplateGroupAPI,
} from "api/template-groups/template-group";

interface DeleteTemplateGroupParams {
  groupTemplateId: number;
}
function useDeleteTemplateGroup(
  options?: UseMutationOptions<
    DeleteTemplateGroupResponse,
    AxiosError<ErrorResponse>,
    DeleteTemplateGroupParams
  >
) {
  return useMutation(
    (params: DeleteTemplateGroupParams) => deleteTemplateGroupAPI(params),
    options
  );
}

export default useDeleteTemplateGroup;
