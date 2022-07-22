import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  apiErrorParser,
  commonSuccessRespFilter,
} from "helpers/responseHelpers";
import { CloudinaryResponse, SuccessDataResponse } from "types/responses";

class AssetsService {
  public static http: AxiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/assets`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static getCloudinarySignature() {
    return AssetsService.http
      .get<
        SuccessDataResponse<{
          timestamp: number;
          apiKey: string;
          cloudName: string;
          folder: string;
          signature: string;
        }>
      >("/signature")
      .then(commonSuccessRespFilter)
      .catch(apiErrorParser);
  }

  static async uploadToCloudinary(files: File[]) {
    const {
      data: {
        data: { apiKey, cloudName, folder, signature, timestamp },
      },
    } = await AssetsService.getCloudinarySignature();

    return Promise.all(files.map((file) => {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);

      return axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
    }));
  }
}

export default AssetsService;