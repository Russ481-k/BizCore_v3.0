import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  changeTwoWayScenarioNodeAPI,
  ChangeScenarioNodeResponse,
  ChangeScenarioNodeParams,
} from "api/scenarios/scenario";

function useChangeNode(
  options?: UseMutationOptions<
    ChangeScenarioNodeResponse,
    AxiosError<ErrorResponse>,
    ChangeScenarioNodeParams
  >
) {
  return useMutation(
    (params: ChangeScenarioNodeParams) => changeTwoWayScenarioNodeAPI(params),
    options
  );
}

export default useChangeNode;
