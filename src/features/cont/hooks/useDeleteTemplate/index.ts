import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  deleteTemplateAPI,
  DeleteTemplateResponse,
} from "api/templates/template";

interface DeleteTemplateParams {
  templateId: number;
}
function useDeleteTemplate(
  options?: UseMutationOptions<
    DeleteTemplateResponse,
    AxiosError<ErrorResponse>,
    DeleteTemplateParams
  >
) {
  return useMutation(
    (params: DeleteTemplateParams) => deleteTemplateAPI(params),
    options
  );
}

export default useDeleteTemplate;
