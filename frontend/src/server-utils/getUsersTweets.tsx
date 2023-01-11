import { getTweets } from '../lib/backend';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setOtherTimeLine } from '../store';

export const getOtherTweets = async (userId: any, limit = 25) => {
  const tweets = await getTweets(userId, limit);
  return tweets;
};

export const useOtherTweets = (userId: any, profileDataQueryData: any) => {
  const dispatch = useDispatch();
  return useQuery('getOtherTweets', () => getOtherTweets(userId), {
    onSuccess: (data) => {
      dispatch(setOtherTimeLine(data));
    },
    enabled: !!profileDataQueryData
  });
};
