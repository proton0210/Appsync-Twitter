import { getMyProfile } from '../lib/backend';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setTwitterProfile } from '../store';
const fetchProfile = async () => {
  return await getMyProfile();
};

export const useProfile = () => {
  const dispatch = useDispatch();
  return useQuery('fetchProfile', () => fetchProfile(), {
    onSuccess: (data) => {
      dispatch(setTwitterProfile(data));
    }
  });
};

