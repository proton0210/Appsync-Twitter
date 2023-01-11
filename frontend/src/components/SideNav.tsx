import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHashtag,
  faBell,
  faEnvelope,
  faBookmark,
  faClipboardList,
  faUser,
  faEllipsisH,
  faCheck,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import { Auth } from 'aws-amplify';
type TwitterProfile = {
  id?: string;
  name?: string;
  screenName?: string;
  imageUrl?: string;
  backgroundImageUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthdate?: string;
  createdAt?: string;
  followersCount?: string;
  followingCount?: string;
  tweetsCount?: string;
  likesCounts?: string;
};

const tabs = [
  {
    icon: <FontAwesomeIcon icon={faHome} />,
    title: 'Home',
    id: 'home',
    target: 'Home'
  },
  {
    icon: <FontAwesomeIcon icon={faHashtag} />,
    title: 'Explore',
    id: 'explore',
    target: 'Explore'
  },
  {
    icon: <FontAwesomeIcon icon={faBell} />,
    title: 'Notifications',
    id: 'notifications',
    target: 'Notifications'
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    title: 'Messages',
    id: 'messages',
    target: 'Messages'
  },
  {
    icon: <FontAwesomeIcon icon={faBookmark} />,
    title: 'Bookmarks',
    id: 'bookmarks',
    target: 'Bookmarks'
  },
  {
    icon: <FontAwesomeIcon icon={faClipboardList} />,
    title: 'Lists',
    id: 'lists',
    target: 'Lists'
  },
  {
    icon: <FontAwesomeIcon icon={faEllipsisH} />,
    title: 'More',
    id: 'more',
    target: 'More'
  }
];
function SideNav() {
  let navigate = useNavigate();
  const { name, screenName, imageUrl } = useSelector(
    (state: any) => state.profile
  );
  const [dropDown, setDropDown] = React.useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      Auth.signOut();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log('error signing out: ', (error as Error).message);
    }
  };
  return (
    <div className="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between min-w-max">
      <div>
        <button className="h-12 w-12 hover:bg-lightblue text-3xl text-blue rounded-full">
          <SocialIcon network="twitter" />
        </button>
        <div>
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                className="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-lightblue rounded-full mr-auto mb-3"
                onClick={() => {
                  navigate('/' + tab.target);
                }}
              >
                <i className="text-2xl mr-4">{tab.icon}</i>
                <p className="text-lg font-semibold text-left hidden lg:block">
                  {tab.title}
                </p>
              </button>
            );
          })}

          <button
            key={'profileButton'}
            className="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-lightblue rounded-full mr-auto mb-3"
            onClick={() => {
              navigate(`/${screenName}`);
            }}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl mr-4"
            ></FontAwesomeIcon>
            <p className="text-lg font-semibold text-left hidden lg:block">
              Profile
            </p>
          </button>
        </div>
        <button className="text-white bg-blue rounded-full font-semibold h-12 lg:h-auto w-20 lg:w-full p-3 hover:bg-darkblue">
          <p className="hidden lg:block">Tweet</p>
          <i className="fas fa-plus lg:hidden"></i>
        </button>
      </div>

      <div className="lg:w-full relative">
        <button
          onClick={() => setDropDown(!dropDown)}
          className="flex items-center w-full hover:bg-lightblue rounded-full p-2"
        >
          <img
            src={imageUrl ? imageUrl : require('../assets/default.png')}
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden lg:block ml-4 truncate">
            <div className="text-left text-sm font-bold leading-tight truncate">
              {name ? name : 'User'}
            </div>
            <div className="text-left text-sm leading-tight text-dark truncate">
              {screenName ? screenName : 'ScreenName'}
            </div>
          </div>
          <FontAwesomeIcon
            icon={faAngleDown}
            className="hidden lg:block  ml-auto text-lg"
          ></FontAwesomeIcon>
        </button>
        {dropDown && (
          <div className="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
            <button
              onClick={() => setDropDown(false)}
              className="p-3 flex items-center w-full hover:bg-lightest"
            >
              <img
                src={imageUrl ? imageUrl : require('../assets/default.png')}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <p className="text-left text-sm font-bold leading-tight">
                  {name ? name : 'User'}
                </p>
                <p className="text-left text-sm leading-tight text-dark">
                  {screenName ? screenName : 'ScreenName'}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faCheck}
                className=" ml-auto text-blue"
              ></FontAwesomeIcon>
            </button>
            <button className="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
              Add an existing account
            </button>
            <button
              className="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm"
              onClick={handleLogout}
            >
              Log out {screenName ? screenName : 'ScreenName'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNav;
