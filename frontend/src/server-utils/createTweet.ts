import { tweet } from '../lib/backend';

export const createTweet = async (text: string) => {
  return await tweet(text);
};
