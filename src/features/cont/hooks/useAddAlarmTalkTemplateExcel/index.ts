import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  addAlarmTalkTemplateExcelAPI,
  AddAlarmTalkTemplateExcelResponse,
} from "api/alarm-talk-templates/alarm-talk-template";

interface AddAlarmTalkTemplateExcelParams {
  groupTemplateId: number;
  file: File;
}
function useAddAlarmTalkTemplateExcel(
  options?: UseMutationOptions<
    AddAlarmTalkTemplateExcelResponse,
    AxiosError<ErrorResponse>,
    AddAlarmTalkTemplateExcelParams
  >
) {
  return useMutation((params: AddAlarmTalkTemplateExcelParams) => {
    return addAlarmTalkTemplateExcelAPI(params);
  }, options);
}

export default useAddAlarmTalkTemplateExcel;
