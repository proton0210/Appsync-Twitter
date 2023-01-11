import { getMyTimeline, getMyProfile } from '../lib/backend';
import { useQuery } from 'react-query';

const fetchProfileAndTimeline = async (limit: number = 10) => {
  return await Promise.all([getMyProfile(), getMyTimeline(limit)]);
};

export const useProfileAndTimeline = (limit: number = 10) => {
  return useQuery('fetchProfileAndTimeline', () =>
    fetchProfileAndTimeline(limit)
  );
};
