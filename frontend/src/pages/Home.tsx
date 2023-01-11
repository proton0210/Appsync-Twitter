import React from 'react';
import { useProfile } from '../server-utils/fetchProfile';
import { useTimeline } from '../server-utils/fetchTimeline';
import { useSelector } from 'react-redux';
import SideNav from '../components/SideNav';
import RightNav from '../components/RightNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFilm,
  faImage,
  faPlus,
  faSmile,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import Tweets from '../components/Tweets';

import { useMutation, useQueryClient } from 'react-query';
import { createTweet } from '../server-utils/createTweet';
import { useScrollToBottomAction } from '../server-utils/scrollToBottom';
import { useInfiniteTweets, getTweetsQuery } from '../server-utils/getTweets';

function Home() {
  const profile = useProfile();
  const timeline = useTimeline();
  const addTweet = useMutation(createTweet);
  const queryClient = useQueryClient();
  let tweets = useSelector((state: any) => state.timeLine.tweets);
  const nextToken = useSelector((state: any) => state.timeLine.nextToken);
  const user = useSelector((state: any) => state.profile);
  const [tweet, setTweet] = React.useState('');
  // const TweetsQuery = useInfiniteTweets(user.id, 10, nextToken);
  if (profile.isLoading || timeline.isLoading) return <div>Loading...</div>;
  if (profile.isError || timeline.isError) return <div>Error</div>;
  // if (TweetsQuery.isLoading) return <div>Loading...</div>;
  // if (TweetsQuery.isError) return <div>Error</div>;

  const handleCreateTweet = async () => {
    try {
      await addTweet.mutate(tweet, {
        onSuccess: (data) => {
          queryClient.refetchQueries('fetchTimeline');
        }
      });
      console.log('Tweet Mutation fired ');
      setTweet('');
    } catch (error) {
      console.log('error creating tweet: ', (error as Error).message);
    }
  };

  // useScrollToBottomAction(document, () => {
  //   console.log('Scroll to bottom action fired');
  // });

  // Implement infinite  scroll
  // TODO : https://ui.dev/c/react-query/infinite-queries
  // useScrollToBottomAction(document);

  return (
    <>
      <main className="flex container h-screen w-full">
        <SideNav />
        <section className="w-full md:w-1/2 h-full overflow-y-scroll">
          <div className="px-5 py-3 border-b border-lighter flex items-center justify-between">
            <h1 className="text-xl font-bold">Home</h1>
            <FontAwesomeIcon
              icon={faStar}
              className=" text-xl text-blue"
            ></FontAwesomeIcon>
          </div>
          <div className="px-2 py-3 border-b-8 border-lighter flex">
            <div className="flex-none mr-4">
              <img
                src={profile.data.imageUrl || require('../assets/default.png')}
                className="flex-none w-12 h-12 rounded-full"
              />
            </div>
            <div className="w-full relative">
              <textarea
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                placeholder="What's happening?"
                className="w-full focus:outline-none mt-3 pb-0 md:pb-3"
              ></textarea>
              <div className="hidden md:block">
                <FontAwesomeIcon
                  className="text-lg text-blue mr-4 "
                  icon={faImage}
                />
                <FontAwesomeIcon
                  className="text-lg text-blue mr-4 fas"
                  icon={faFilm}
                />
                <FontAwesomeIcon
                  className="text-lg text-blue mr-4 far "
                  icon={faChartBar}
                />
                <FontAwesomeIcon
                  className="text-lg text-blue mr-4 far "
                  icon={faSmile}
                />
              </div>
              <div className="flex justify-end md:inline">
                <button
                  onClick={handleCreateTweet}
                  type="button"
                  className={
                    'h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue rounded-full bottom-0 right-0 md:absolute' +
                    `${tweet ? '' : ' opacity-50 cursor-not-allowed'}`
                  }
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
          {/* Time Line Section */}

          {tweets.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full pt-10 px-6">
              <p className="font-bold text-lg">Welcome to Twitter!</p>
              <p className="text-sm text-dark text-center">
                This is the best place to see what’s happening in your world.
                Find some people and topics to follow now.
              </p>
              <button className="text-white bg-blue rounded-full font-semibold mt-4 px-4 py-2 hover:bg-darkblue">
                <p className="hidden lg:block">Let's go!</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="lg:hidden"
                ></FontAwesomeIcon>
              </button>
            </div>
          )}

          <Tweets tweets={tweets} />
        </section>

        <RightNav />
      </main>
    </>
  );
}

export default Home;
