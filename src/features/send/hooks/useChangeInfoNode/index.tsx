import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  changeTwoWayScenarioInfoNodeAPI,
  ChangeScenarioInfoNodeResponse,
} from "api/scenarios/scenario";
import InfoNode from "type/InfoNode";

function useChangeInfoNode(
  options?: UseMutationOptions<
    ChangeScenarioInfoNodeResponse,
    AxiosError<ErrorResponse>,
    InfoNode
  >
) {
  return useMutation(
    (params: InfoNode) => changeTwoWayScenarioInfoNodeAPI(params),
    options
  );
}

export default useChangeInfoNode;
