import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import {
  createTextFileAPI,
  CreateTextFileResponse,
} from "api/systems/create-text-file";

function useCreateTextFile(
  options?: UseMutationOptions<
    CreateTextFileResponse,
    AxiosError<ErrorResponse>,
    {
      content: string;
      encoding?: string;
      fileName?: string;
    }
  >
) {
  return useMutation(
    (param: { content: string; fileName?: string; encoding?: string }) =>
      createTextFileAPI(param),
    options
  );
}

export default useCreateTextFile;
