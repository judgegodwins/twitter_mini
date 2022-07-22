import { User, AuthData } from "./auth";

declare interface Response {
  success: boolean;
  message: string;
}

declare interface PaginatedResponse<Data = any> extends SuccessDataResponse<Data[]> {
  pageData: {
    total: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    lastPage: number;
  }
}

declare interface SuccessDataResponse<Data> extends Response {
  data: Data
}

declare interface FailureResponse extends Response {
  data?: null;
}

declare interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  url: string;
  secure_url: string;
}