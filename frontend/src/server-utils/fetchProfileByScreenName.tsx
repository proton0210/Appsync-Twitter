import { getProfileByScreenName } from '../lib/backend';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setOtherTwitterProfile } from '../store';
export const getOtherProfile = async (screenName: any) => {
  const profile = await getProfileByScreenName(screenName);
  return profile;
};

export const useProfileByScreenName = (screenName: any) => {
  const dispatch = useDispatch();
  return useQuery('getOtherProfile', () => getOtherProfile(screenName), {
    onSuccess: (data) => {
      dispatch(setOtherTwitterProfile(data));
      
    }
  });
};
