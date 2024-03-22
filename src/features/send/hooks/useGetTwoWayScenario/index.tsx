import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  GetScenarioResponse,
  getTwoWayScenarioAPI,
} from "api/scenarios/scenario";

function useGetTwoWayScenario(
  params: {
    groupId: number;
  },
  options?: UseQueryOptions<GetScenarioResponse, AxiosError<ErrorResponse>>
) {
  const result = useQuery<GetScenarioResponse, AxiosError<ErrorResponse>>({
    queryKey: ["scenario", params.groupId],
    queryFn: () => getTwoWayScenarioAPI(params),
    ...options,
  });
  return {
    ...result,
    autoReply: result.data?.data?.autoreply,
    close: result.data?.data?.close,
    exception: result.data?.data?.exception,
    expired: result.data?.data?.expired,
    scenarios: result.data?.data?.depth,
    groupId: result.data?.data?.groupId,
    isUse: result.data?.data?.isUse,
    mmsReply: result.data?.data?.mmsReply,
    serviceName: result.data?.data?.serviceName,
    filePath: result.data?.data?.filePath,
  };
}

export default useGetTwoWayScenario;
