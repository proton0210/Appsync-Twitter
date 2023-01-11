import { retweet, unretweet } from '../lib/backend';

export const retweetedTweet = async (id: string) => {
  return await retweet(id);
};

export const unretweetedTweet = async (id: string) => {
  return await unretweet(id);
};
