import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  addTemplateGroupAPI,
  AddTemplateGroupResponse,
} from "api/template-groups/template-group";

interface AddTemplateGroupParams {
  groupTemplateName: string;
}
function useAddTemplateGroup(
  options?: UseMutationOptions<
    AddTemplateGroupResponse,
    AxiosError<ErrorResponse>,
    AddTemplateGroupParams
  >
) {
  return useMutation(
    (params: AddTemplateGroupParams) => addTemplateGroupAPI(params),
    options
  );
}

export default useAddTemplateGroup;
