import { createSlice } from '@reduxjs/toolkit';

const timeLine = createSlice({
  name: 'timeLine',
  initialState: {
    nextToken: '',
    tweets: []
  },
  reducers: {
    setTimeLine: (state, action) => {
      state.nextToken = action.payload.nextToken;
      state.tweets = action.payload.tweets;
    }
  }
});

export default timeLine.reducer;
export const { setTimeLine } = timeLine.actions;
