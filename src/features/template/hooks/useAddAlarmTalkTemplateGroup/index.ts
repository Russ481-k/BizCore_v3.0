import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  AddAlarmTalkTemplateGroupAPI,
  AddAlarmTalkTemplateGroupResponse,
} from "api/alarm-talk-template-groups/alarm-talk-template-group";

interface AddAlarmTalkTemplateGroupParams {
  groupTemplateName: string;
}
function useAddAlarmTalkTemplateGroup(
  options?: UseMutationOptions<
    AddAlarmTalkTemplateGroupResponse,
    AxiosError<ErrorResponse>,
    AddAlarmTalkTemplateGroupParams
  >
) {
  return useMutation(
    (params: AddAlarmTalkTemplateGroupParams) =>
      AddAlarmTalkTemplateGroupAPI(params),
    options
  );
}

export default useAddAlarmTalkTemplateGroup;
