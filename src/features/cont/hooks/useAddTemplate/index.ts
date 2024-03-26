import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { addTemplateAPI, AddTemplateResponse } from "api/templates/template";

interface AddTemplateParams {
  template: {
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
function useAddTemplate(
  options?: UseMutationOptions<
    AddTemplateResponse,
    AxiosError<ErrorResponse>,
    AddTemplateParams
  >
) {
  return useMutation((params: AddTemplateParams) => {
    return addTemplateAPI(params);
  }, options);
}

export default useAddTemplate;
