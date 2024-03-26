import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  changeTemplateAPI,
  ChangeTemplateResponse,
} from "api/templates/template";

interface ChangeTemplateParams {
  template: {
    templateId?: number | null;
    templateName?: string | null;
    wiredPhoneNumber?: string | null;
    templateMsgTitle?: string | null;
    templateMsgContext?: string | null;
    templateChannel?: string | null;
    groupTemplateId?: number | null;
    changeFiles?: Array<{
      uniqueFileName: string;
      fileOrder: number;
    }>;
  };
  files: File[];
}
function useChangeTemplate(
  options?: UseMutationOptions<
    ChangeTemplateResponse,
    AxiosError<ErrorResponse>,
    ChangeTemplateParams
  >
) {
  return useMutation((params: ChangeTemplateParams) => {
    return changeTemplateAPI(params);
  }, options);
}

export default useChangeTemplate;
