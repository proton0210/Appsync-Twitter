import { tweet } from '../lib/backend';

export const createTweetUtil = async (tweetText: string) => {
  try {
    const data = await tweet(tweetText);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
