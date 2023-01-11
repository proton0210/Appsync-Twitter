import {
  like,
  unlike,
  retweet,
  unretweet,
  getMyTimeline
} from '../lib/backend';

export const handleLike = async (tweetId: string) => {
  try {
    const result = await like(tweetId);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const handleUnlike = async (tweetId: string) => {
  try {
    const result = await unlike(tweetId);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const handleRetweet = async (tweetId: string) => {
  try {
    const result = await retweet(tweetId);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const handleUnretweet = async (tweetId: string) => {
  try {
    const result = await unretweet(tweetId);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const handleGetMyTimeline = async (limit: number = 10) => {
  try {
    const result = await getMyTimeline(limit);
    return result;
  } catch (error: any) {
    return error.message;
  }
};
