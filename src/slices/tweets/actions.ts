import { createAsyncThunk } from "@reduxjs/toolkit";
import TweetService from "services/TweetService";
import { PaginationQuery } from "types/common";
import { Tweet, TweetCreation } from "types/tweet";

export const createTweet = createAsyncThunk(
  "tweets/create",
  async (body: TweetCreation) => {
    const { data: resData } = await TweetService.createTweet(body);

    return resData.data;
  }
);

export const getFeed = createAsyncThunk<
  { tweets: Tweet[], hasMore: boolean },
  PaginationQuery
>("tweets/feed", async (query) => {
  const { data: resData } = await TweetService.getFeed(query);

  return { tweets: resData.data, hasMore: Boolean(resData.pageData.nextPage) };
});
