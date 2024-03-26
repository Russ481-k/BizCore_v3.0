import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  AddScenarioNodeParams,
  addTwoWayScenarioNodeAPI,
  ChangeScenarioNodeResponse,
} from "api/scenarios/scenario";

function useAddNode(
  options?: UseMutationOptions<
    ChangeScenarioNodeResponse,
    AxiosError<ErrorResponse>,
    AddScenarioNodeParams
  >
) {
  return useMutation(
    (params: AddScenarioNodeParams) => addTwoWayScenarioNodeAPI(params),
    options
  );
}

export default useAddNode;
