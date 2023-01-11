import { follow, unfollow, getFollowers, getFollowing } from '../lib/backend';

export const followUser = async (userId: string) => {
  try {
    const response = await follow(userId);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const unFollowUser = async (userId: string) => {
  const response = await unfollow(userId);
  return response;
};

export const getFollowersList = async (userId: string) => {
  const response = await getFollowers(userId);
  return response;
};

export const getFollowingList = async (userId: string) => {
  const response = await getFollowing(userId);
  return response;
};
