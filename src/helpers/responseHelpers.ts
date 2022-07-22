import axios, { AxiosError, AxiosResponse } from "axios";
import { FailureResponse, Response } from "types/responses";

export const apiErrorParser = (e: Error | AxiosError<FailureResponse>) => {
  if (axios.isAxiosError(e) && e.response) {
    throw new Error(e.response?.data.message)
  } else {
    throw e;
  }
}

export const commonSuccessRespFilter = <RType extends Response>(
  response: AxiosResponse<RType>
) => {
  if (!response.data.success)
    throw new Error(response.data.message);

  return response;
}