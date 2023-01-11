import { getTweets } from '../lib/backend';
import { useInfiniteQuery, useQuery } from 'react-query';
export const fetchTweets = async (
  userid: string,
  limit = 10,
  token: string = ''
) => {
  return await getTweets(userid, limit, token);
};

export const useInfiniteTweets = (
  userid: string,
  limit = 10,
  token: string = ''
) => {
  return useInfiniteQuery('tweets', () => fetchTweets(userid, limit, token), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return;
      }
      return pages.length + 1;
    }
  });
};

export const getTweetsQuery = (
  userid: string,
  limit = 10,
  token: string = ''
) => {
  return useQuery('tweets', () => fetchTweets(userid, limit, token));
};
