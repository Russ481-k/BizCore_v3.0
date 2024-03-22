import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  deleteAlarmTalkTemplateAPI,
  DeleteAlarmTalkTemplateResponse,
} from "api/alarm-talk-templates/alarm-talk-template";

interface DeleteAlarmTalkTemplateParams {
  templateId: number;
}
function useDeleteAlarmTalkTemplate(
  options?: UseMutationOptions<
    DeleteAlarmTalkTemplateResponse,
    AxiosError<ErrorResponse>,
    DeleteAlarmTalkTemplateParams
  >
) {
  return useMutation(
    (params: DeleteAlarmTalkTemplateParams) =>
      deleteAlarmTalkTemplateAPI(params),
    options
  );
}

export default useDeleteAlarmTalkTemplate;
