import { editMyProfile } from '../lib/backend';

export const updateMyProfile = async (newProfile: any) => {
  const response = await editMyProfile(newProfile);
  return response;
};
