import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  ChangeAlarmTalkTemplateGroupResponse,
  changeAlarmTalkTemplateGroupAPI,
} from "api/alarm-talk-template-groups/alarm-talk-template-group";

interface ChangeAlarmTalkTemplateGroupParams {
  groupTemplateId: number;
  groupTemplateName: string;
}
function useChangeAlarmTalkTemplateGroup(
  options?: UseMutationOptions<
    ChangeAlarmTalkTemplateGroupResponse,
    AxiosError<ErrorResponse>,
    ChangeAlarmTalkTemplateGroupParams
  >
) {
  return useMutation(
    (params: ChangeAlarmTalkTemplateGroupParams) =>
      changeAlarmTalkTemplateGroupAPI(params),
    options
  );
}

export default useChangeAlarmTalkTemplateGroup;
