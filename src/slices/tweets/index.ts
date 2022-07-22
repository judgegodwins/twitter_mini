import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { Tweet } from "types/tweet";
import { boolean } from "yup";
import { getFeed } from "./actions";
// import type { RootState } from 'store'

interface State {
  tweets: Tweet[];
  fetching: boolean;
  hasMore: boolean
}

const initialState: State = {
  tweets: [],
  fetching: false,
  hasMore: false
}; 

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Tweet>) {
      state.tweets.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state) => {
      state.fetching = true;
    });

    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.tweets = [...action.payload.tweets, ...state.tweets];
      state.hasMore = action.payload.hasMore;
      state.fetching = false;
    });

    builder.addCase(getFeed.rejected, (state) => {
      state.fetching = false;
    });    
  },
});

export default tweetsSlice.reducer;
