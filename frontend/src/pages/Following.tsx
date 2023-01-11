import React from 'react';
import SideNav from '../components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getFollowingList } from '../server-utils/FollowOperations';
import { useSelector } from 'react-redux';
import Users from '../components/Users';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Following() {
  const navigate = useNavigate();
  const otherProfile = useSelector((state: any) => state.otherProfile.profile);

  const { screenName }: any = useParams();
  const queryByScreenName = useQuery('fetchFollowers', () =>
    getFollowingList(otherProfile.id)
  );
  if (queryByScreenName.isLoading) return <div>Loading...</div>;
  if (queryByScreenName.isError) return <div>Error</div>;

  const { profiles } = queryByScreenName.data;
  const gotoProfile = () => {
    navigate(`/${screenName}`);
  };

  const goToFollowers = () => {
    navigate(`/${screenName}/followers`);
  };
  return (
    <>
      <div id="app" className="flex container h-full w-full">
        <div className="flex container h-full w-full">
          <SideNav />

          <div className="w-full md:w-1/2 h-full overflow-y-scroll">
            {/* <!-- top navigation --> */}
            <div className="px-5 pt-3 flex items-center">
              <button
                onClick={gotoProfile}
                className="rounded-full p-3 px-4 focus:outline-none hover:bg-lightblue"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="fas fa-arrow-left text-blue"
                ></FontAwesomeIcon>
              </button>
              <div className="lg:block ml-4">
                <h1 className="text-xl font-bold">{otherProfile.name}</h1>
                <p className="text-left text-sm leading-tight text-dark">
                  @{otherProfile.screenName}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-evenly mt-2">
              <button
                onClick={goToFollowers}
                className="w-1/2 text-dark font-bold border-b-2 px-10 py-4 hover:bg-lightblue"
              >
                Followers
              </button>
              <button className="w-1/2 text-dark font-bold border-b-2 border-blue px-10 py-4 hover:bg-lightblue">
                Following
              </button>
            </div>

            <Users users={profiles} />
          </div>

          <div className="hidden md:block w-1/3 z-0 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Following;
