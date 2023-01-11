import React from 'react';
import SideNav from '../components/SideNav';
import SearchBar from '../components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import timeago from '../server-utils/timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from 'react-query';
import {
  faArrowLeft,
  faCalendar,
  faEllipsisH,
  faEnvelope,
  faLink,
  faMapMarkerAlt,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import Tweets from '../components/Tweets';

import SetUpProfileOverlay from '../components/SetUpProfileOverlay';
import EditProfileOverlay from '../components/EditProfileOverlay';
import { useParams } from 'react-router';
import { useProfileByScreenName } from '../server-utils/fetchProfileByScreenName';
import { useOtherTweets } from '../server-utils/getUsersTweets';
import { followUser, unFollowUser } from '../server-utils/FollowOperations';
import { useNavigate } from 'react-router';

function Profile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { screenName } = useParams();

  const profileData = useProfileByScreenName(screenName);
  const profile = useSelector((state: any) => state.otherProfile.profile);
  const otherTweets = useOtherTweets(profile.id, profileData.data);

  const user = useSelector((state: any) => state.auth.user);
  const tweets = useSelector((state: any) => state.otherProfile.tweets.tweets);
  const isSelf = user.username === profile.id;

  const joinedDate = timeago(profile.createdAt);
  const [followingLabel, setFollowingLabel] = React.useState('Following');
  const [showSetUpProfile, setShowSetUpProfile] = React.useState(false);
  const [editProfileModal, setEditProfileModal] = React.useState(false);

  const setUpProfile = () => {
    setShowSetUpProfile(true);
  };
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
    <div className="flex container h-screen w-full">
      <div className="flex container h-screen w-full">
        <SideNav />

        <div className="w-1/2 h-full overflow-y-scroll">
          <div className="px-5 py-3 border-b border-lighter flex items-center">
            <button
              className="rounded-full p-3 px-4 focus:outline-none hover:bg-lightblue"
              onClick={gotoHome}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="fas fa-arrow-left text-blue"
              />
            </button>
            <div className="lg:block ml-4">
              <h1 className="text-xl font-bold">{profile.name}</h1>
              <p className="text-left text-sm leading-tight text-dark">
                {profile.tweetsCount} Tweets
              </p>
            </div>
          </div>

          {/* <!-- background image --> */}
          <div
            className="border-b-1 border-lighter flex"
            style={{ height: '200px', display: 'block' }}
          >
            {profile.backgroundImageUrl && (
              <div className="h-full max-h-full">
                <img
                  src={profile.backgroundImageUrl}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {!profile.backgroundImageUrl && (
              <div className="bg-gray-400 h-full max-h-full"></div>
            )}
          </div>

          {/* <!-- profile details --> */}
          <div className="p-3 flex flex-col">
            <div className="flex flex-row justify-between">
              <img
                src={profile.imageUrl}
                className="w-32 h-32 rounded-full border-white border-4"
                style={{ marginTop: '-80px' }}
              />

              {isSelf && (
                <div>
                  {profile.imageUrl === null ||
                    (profile.imageUrl === 'default_profile.png' && (
                      <button
                        className="ml-auto text-blue font-bold px-4 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue"
                        onClick={setUpProfile}
                      >
                        Set up profile
                      </button>
                    ))}
                  {profile.imageUrl !== null &&
                    profile.imageUrl !== 'default_profile.png' && (
                      <button
                        className="ml-auto text-blue font-bold px-4 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue"
                        onClick={() => setEditProfileModal(true)}
                      >
                        Edit profile
                      </button>
                    )}
                </div>
              )}

              {!isSelf && (
                <div>
                  <button className="ml-auto mr-3 text-blue font-bold px-3 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue">
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      className="fas fa-ellipsis-h"
                    ></FontAwesomeIcon>
                  </button>
                  <button className="ml-auto mr-3 text-blue font-bold px-3 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="fas fa-envelope"
                    ></FontAwesomeIcon>
                  </button>
                  {!profile.following && (
                    <button
                      className="ml-auto text-blue font-bold px-4 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue"
                      onClick={() => handleFollowUser(user.username)}
                    >
                      Follow
                    </button>
                  )}
                  {profile.following && (
                    <button
                      onMouseOver={() => setFollowingLabel('Unfollow')}
                      onMouseLeave={() => setFollowingLabel('Following')}
                      onClick={() => handleUnFollowUser(user.username)}
                      className="ml-auto text-white bg-blue font-bold px-4 py-2 rounded-full border mb-2 hover:bg-red-700"
                    >
                      {followingLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div>
              <p className="font-bold text-xl">{profile.name}</p>
              <p className="text-dark">@{profile.screenName}</p>
              <p className="my-2">{profile.bio}</p>
              <div className="flex flex-row mt-1 mb-2">
                {profile.location && (
                  <div className="flex flex-row mr-4">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="fas fa-map-marker-alt text-dark align-text-bottom pt-1 mr-2"
                    ></FontAwesomeIcon>
                    <p className="text-dark">{profile.location}</p>
                  </div>
                )}
                {profile.website && (
                  <div className="flex flex-row mr-4">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="fas fa-link text-dark align-text-bottom pt-1 mr-2"
                    ></FontAwesomeIcon>
                    <a
                      href={profile.website}
                      target="_blank"
                      className="text-dark"
                    >
                      {profile.website
                        .replace('https://', '')
                        .replace('http://', '')}
                    </a>
                  </div>
                )}
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="far fa-calendar-alt text-dark align-text-bottom pt-1 mr-2"
                ></FontAwesomeIcon>
                <p className="text-dark">Joined {joinedDate}</p>
              </div>
              <div className="flex flex-row mt-1">
                <button
                  className="mr-4 flex flex-row hover:underline"
                  onClick={goToFollowingPage}
                >
                  <span className="font-bold">{profile.followingCount}</span>
                  <span className="text-dark whitespace-pre"> Following</span>
                </button>
                <button
                  className="flex flex-row hover:underline"
                  onClick={goToFollowersPage}
                >
                  <span className="font-bold">{profile.followersCount}</span>
                  <span className="text-dark whitespace-pre"> Followers</span>
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-evenly mt-2">
              <button className="text-dark font-bold border-b-2 border-blue px-10 py-4 hover:bg-lightblue">
                Tweets
              </button>
              <button className="text-dark font-bold border-b-2 px-10 py-4 hover:bg-lightblue">
                Tweets & replies
              </button>
              <button className="text-dark font-bold border-b-2 px-10 py-4 hover:bg-lightblue">
                Media
              </button>
              <button className="text-dark font-bold border-b-2 px-10 py-4 hover:bg-lightblue">
                Like
              </button>
            </div>
          </div>

          {/* <!-- tweets --> */}
          {tweets.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full pt-10">
              <p className="font-bold text-lg">You haven’t Tweeted yet</p>
              <p className="text-sm text-dark">
                When you post a Tweet, it’ll show up here.
              </p>
              <button className="text-white bg-blue rounded-full font-semibold mt-4 px-4 py-2 hover:bg-darkblue">
                <p className="hidden lg:block">Tweet now</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="fas fa-plus lg:hidden"
                ></FontAwesomeIcon>
              </button>
            </div>
          )}

          <Tweets tweets={tweets} />
        </div>

        <div className="hidden md:block w-1/3 z-0 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative">
          <SearchBar />
        </div>

        {showSetUpProfile && (
          <SetUpProfileOverlay setShowSetUpProfile={setShowSetUpProfile} />
        )}

        {editProfileModal && (
          <EditProfileOverlay setEditProfileModal={setEditProfileModal} />
        )}
      </div>
    </div>
  );
}

export default Profile;
