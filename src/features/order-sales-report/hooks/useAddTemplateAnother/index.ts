import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  addTemplateAnotherAPI,
  AddTemplateAnotherResponse,
} from "api/templates/template";

export interface AddTemplateAnotherParams {
  template: {
    templateId?: number | null;
    templateName?: string | null;
    wiredPhoneNumber?: string | null;
    templateMsgTitle?: string | null;
    templateMsgContext?: string | null;
    templateChannel?: string | null;
    groupTemplateId?: number | null;
    uniqueFileName?: string[];
    changeFileOrder?: string[];
  };
  files: File[];
}
function useAddTemplateAnother(
  options?: UseMutationOptions<
    AddTemplateAnotherResponse,
    AxiosError<ErrorResponse>,
    AddTemplateAnotherParams
  >
) {
  return useMutation((params: AddTemplateAnotherParams) => {
    return addTemplateAnotherAPI(params);
  }, options);
}

export default useAddTemplateAnother;
