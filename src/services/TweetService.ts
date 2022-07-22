import axios, { AxiosInstance, AxiosResponse } from "axios";
import _ from "lodash";
import { PaginatedResponse, SuccessDataResponse } from "types/responses";
import {
  apiErrorParser,
  commonSuccessRespFilter,
} from "helpers/responseHelpers";
import { getAccessToken } from "helpers/authHelpers";
import { Tweet, TweetCreation } from "types/tweet";
import { PaginationQuery } from "types/common";

class TweetService {
  public static http: AxiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/tweet`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static pluginInterceptor() {
    TweetService.http.interceptors.request.use(function (config) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${getAccessToken()}`,
        },
      };
    });
  }

  static createTweet(body: TweetCreation) {
    return TweetService.http
      .post<SuccessDataResponse<Tweet>>("/", body)
      .then(commonSuccessRespFilter)
      .catch(apiErrorParser);
  }

  static getTweet(id: string) {
    return TweetService.http
      .get<SuccessDataResponse<Tweet>>(`/get/${id}`)
      .then(commonSuccessRespFilter)
      .catch(apiErrorParser);
  }

  static getFeed(query: PaginationQuery) {
    return TweetService.http
      .get<PaginatedResponse<Tweet>>("/feed", { params: query })
      .then(commonSuccessRespFilter)
      .catch(apiErrorParser);
  }

  static getComments(page: number, limit: number, id: string) {
    return TweetService.http
      .get<PaginatedResponse<Tweet>>("/comments", {
        params: { id, page, limit },
      })
      .then(commonSuccessRespFilter)
      .catch(apiErrorParser);
  }

  static getParents(id: string) {
    return TweetService.http
      .get<SuccessDataResponse<Tweet[]>>("/parents", { params: { id } })
      .then(commonSuccessRespFilter)
      .catch(apiErrorParser);
  }
}

TweetService.pluginInterceptor();

export default TweetService;
