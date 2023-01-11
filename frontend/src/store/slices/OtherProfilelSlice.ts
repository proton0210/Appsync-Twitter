import { createSlice } from '@reduxjs/toolkit';

const otherProfile = createSlice({
  name: 'twitter',
  initialState: {
    profile: {
      id: '',
      name: '',
      screenName: '',
      imageUrl: '',
      backgroundImageUrl: '',
      bio: '',
      location: '',
      website: '',
      birthdate: '',
      createdAt: '',
      followersCount: '',
      followingCount: '',
      tweetsCount: '',
      likesCounts: '',
      following: false
    },
    tweets: {
      tweets: [],
      nextToken: undefined
    }
  },
  reducers: {
    setOtherTwitterProfile: (state, action) => {
      state.profile.id = action.payload.id;
      state.profile.createdAt = action.payload.createdAt;
      state.profile.imageUrl = action.payload.imageUrl;
      state.profile.name = action.payload.name;
      state.profile.screenName = action.payload.screenName;
      state.profile.backgroundImageUrl = action.payload.backgroundImageUrl;
      state.profile.bio = action.payload.bio;
      state.profile.location = action.payload.location;
      state.profile.website = action.payload.website;
      state.profile.birthdate = action.payload.birthdate;
      state.profile.followersCount = action.payload.followersCount;
      state.profile.followingCount = action.payload.followingCount;
      state.profile.tweetsCount = action.payload.tweetsCount;
      state.profile.likesCounts = action.payload.likesCounts;
      state.profile.following = action.payload.following;
    },
    setOtherTimeLine: (state, action) => {
      state.tweets.tweets = action.payload.tweets;
      state.tweets.nextToken = action.payload.nextToken;
    }
  }
});

export default otherProfile.reducer;
export const { setOtherTwitterProfile, setOtherTimeLine } =
  otherProfile.actions;
