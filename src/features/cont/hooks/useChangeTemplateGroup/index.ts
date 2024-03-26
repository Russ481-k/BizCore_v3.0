import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  ChangeTemplateGroupResponse,
  changeTemplateGroupAPI,
} from "api/template-groups/template-group";

interface ChangeTemplateGroupParams {
  groupTemplateId: number;
  groupTemplateName: string;
}
function useChangeTemplateGroup(
  options?: UseMutationOptions<
    ChangeTemplateGroupResponse,
    AxiosError<ErrorResponse>,
    ChangeTemplateGroupParams
  >
) {
  return useMutation(
    (params: ChangeTemplateGroupParams) => changeTemplateGroupAPI(params),
    options
  );
}

export default useChangeTemplateGroup;
