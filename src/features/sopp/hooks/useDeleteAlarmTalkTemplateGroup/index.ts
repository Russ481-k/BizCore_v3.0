import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  deleteAlarmTalkTemplateGroupAPI,
  DeleteAlarmTalkTemplateGroupResponse,
} from "api/alarm-talk-template-groups/alarm-talk-template-group";

interface DeleteAlarmTalkTemplateGroupParams {
  groupTemplateId: number;
}
function useDeleteTemplateGroup(
  options?: UseMutationOptions<
    DeleteAlarmTalkTemplateGroupResponse,
    AxiosError<ErrorResponse>,
    DeleteAlarmTalkTemplateGroupParams
  >
) {
  return useMutation(
    (params: DeleteAlarmTalkTemplateGroupParams) =>
      deleteAlarmTalkTemplateGroupAPI(params),
    options
  );
}

export default useDeleteTemplateGroup;
