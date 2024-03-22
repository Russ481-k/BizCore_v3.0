import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";
import { uploadImageAPI, UploadImageResponse } from "api/systems/images";

function useUploadImage(
  options?: UseMutationOptions<
    UploadImageResponse,
    AxiosError<ErrorResponse>,
    {
      fileBase64: string;
      fileName: string;
    }
  >
) {
  return useMutation(
    (param: { fileBase64: string; fileName: string }) => uploadImageAPI(param),
    options
  );
}

export default useUploadImage;
