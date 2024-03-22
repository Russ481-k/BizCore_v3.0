import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponse } from "api";
import {
  changeMyProfileAPI,
  ChangeMyProfileParams,
  ChangeMyProfileResponse,
} from "api/users/current";

function useChangeMyProfile(
  options?: UseMutationOptions<
    ChangeMyProfileResponse,
    AxiosError<ErrorResponse>,
    ChangeMyProfileParams
  >
) {
  return useMutation(
    (params: ChangeMyProfileParams) => changeMyProfileAPI(params),
    options
  );
}

export default useChangeMyProfile;
