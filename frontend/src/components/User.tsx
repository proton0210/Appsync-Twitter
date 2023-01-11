import React from 'react';
import SideNav from '../components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { followUser, unFollowUser } from '../server-utils/FollowOperations';
import { useQueryClient } from 'react-query';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
interface UserProps {
  user: any;
}

function User({ user }: UserProps) {
  const [followingLabel, setFollowingLabel] = React.useState('Following');

  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const queryClient = useQueryClient();

  const goToFollowersPage = () => {
    return navigate(`/${profile.screenName}/followers`);
  };
  const goToFollowingPage = () => {
    return navigate(`/${profile.screenName}/following`);
  };

  const gotoHome = () => {
    return navigate('/home');
  };

  const handleFollowUser = async (profileId: string) => {
    try {
      const res = await followUser(profileId);
      profile.following = true;
      profile.followersCount = profile.followersCount + 1;
      queryClient.refetchQueries('getOtherProfile');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleUnFollowUser = async (profileId: string) => {
    try {
      const res = await unFollowUser(profileId);
      profile.following = false;
      profile.followersCount = profile.followersCount - 1;
      queryClient.refetchQueries('getOtherProfile');
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full px-4 py-2 border-b hover:bg-lightest flex flex-row">
        <div className="flex-none">
          <Link to={`/${user.screenName}`}>
            <img
              src={`${user.imageUrl || 'default_profile.png'}`}
              className="h-12 w-12 rounded-full"
            />
          </Link>
        </div>
        <div className="ml-2 flex flex-col w-full">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <p className="text-dark text-sm">@{user.screenName}</p>
            </div>
            {profile.id !== user.id && (
              <div>
                {!user.following && (
                  <button
                    onClick={() => handleFollowUser(user.id)}
                    className="ml-auto text-blue font-bold px-4 py-1 rounded-full border border-blue mb-2 hover:bg-lightblue"
                  >
                    Follow
                  </button>
                )}
                {user.following && (
                  <button
                    onMouseOver={() => setFollowingLabel('Unfollow')}
                    onMouseLeave={() => setFollowingLabel('Following')}
                    onClick={() => handleUnFollowUser(user.id)}
                    className="ml-auto text-white bg-blue font-bold px-4 py-1 rounded-full border mb-2 hover:bg-red-700"
                  >
                    {followingLabel}
                  </button>
                )}
              </div>
            )}
          </div>
          <div>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
