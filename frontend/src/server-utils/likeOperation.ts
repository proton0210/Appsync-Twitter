import { like, unlike } from '../lib/backend';

export const likedTweet = async (id: string) => {
  return await like(id);
};

export const unlikedTweet = async (id: string) => {
  return await unlike(id);
};
