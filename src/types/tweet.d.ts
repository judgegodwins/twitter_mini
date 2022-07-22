import { User } from "./auth";

export enum TweetType {
  ORIGINAL = "original",
  QUOTE_RETWEET = "quote_retweet",
  RETWEET = "retweet",
}

export interface BaseTweet {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  type: TweetType;
  userId: string;
  parentId: string | null;
  quotedId: string | null;
}

export interface Tweet extends BaseTweet {
  user: User;
  commentCount: number;
  totalRetweetCount: number;
  retweetCount: number;
  quoteRetweetCount: number;
  likeCount: number;
}

export interface TweetCreation {
  content: string;
  images: string[];
}