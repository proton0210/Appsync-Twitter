import { reply } from '../lib/backend';

export const replyTweet = async (tweetId: string, text: string) => {
  try {
    const response = await reply(tweetId, text);
    return response;
  } catch (error: any) {
    console.log(error.errors[0].message);
  }
};
