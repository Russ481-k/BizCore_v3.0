import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ErrorResponse } from "api";

import {
  getWiredPhoneNumbersAPI,
  GetWiredPhoneNumbersResponse,
} from "api/wired-phone-number";

function useGetWiredPhoneNumbers(
  options?: UseQueryOptions<
    GetWiredPhoneNumbersResponse,
    AxiosError<ErrorResponse>
  >
) {
  const result = useQuery<
    GetWiredPhoneNumbersResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["wired-phone-numbers"],
    queryFn: () => getWiredPhoneNumbersAPI(),
    ...options,
  });
  return {
    ...result,
    data: result.data?.data,
  };
}

export default useGetWiredPhoneNumbers;
