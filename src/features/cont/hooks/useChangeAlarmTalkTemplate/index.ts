import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  changeAlarmTalkTemplateAPI,
  ChangeAlarmTalkTemplateParams,
  ChangeAlarmTalkTemplateResponse,
} from "api/alarm-talk-templates/alarm-talk-template";

function useChangeAlarmTalkTemplate(
  options?: UseMutationOptions<
    ChangeAlarmTalkTemplateResponse,
    AxiosError<ErrorResponse>,
    ChangeAlarmTalkTemplateParams
  >
) {
  return useMutation((params: ChangeAlarmTalkTemplateParams) => {
    return changeAlarmTalkTemplateAPI(params);
  }, options);
}

export default useChangeAlarmTalkTemplate;
