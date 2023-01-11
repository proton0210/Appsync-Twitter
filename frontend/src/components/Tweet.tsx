import {
  faAngleDown,
  faComment,
  faHeart,
  faRetweet,
  faShareSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReplyOverlay from './ReplyOverlay';
import {
  retweetedTweet,
  unretweetedTweet
} from '../server-utils/retweetOperation';

import { likedTweet, unlikedTweet } from '../server-utils/likeOperation';

import timeago from '../server-utils/timeago';
type Tweet = {
  id?: string;
  profile?: {
    id?: string;
    name?: string;
    screenName?: string;
    imageUrl?: string;
  };
  createdAt?: string;
  text?: string;
  liked?: boolean;
  likes?: number;
  retweeted?: true;
  retweets?: number;
  replies?: number;
};

function Tweet({ tweet }: { tweet: any }) {
  const [isLiked, setIsLiked] = React.useState(tweet.liked);
  const [isRetweeted, setIsRetweeted] = React.useState(tweet.retweeted);
  const [showReplyOverlay, setShowReplyOverlay] = React.useState(false);
  const replyToTweet = () => {
    setShowReplyOverlay((prev) => !prev);
  };

  const handleLike = async () => {
    console.log(' clicked isLiked', isLiked);
    if (isLiked) {
      await unlikedTweet(tweet.id);
      setIsLiked(false);
    } else {
      await likedTweet(tweet.id);
      setIsLiked(true);
    }
  };

  const handleRetweet = async () => {
    if (isRetweeted) {
      await unretweetedTweet(tweet.id);
      setIsRetweeted(false);
    } else {
      await retweetedTweet(tweet.id);
      setIsRetweeted(true);
    }
  };

  return (
    <>
      {tweet.profile && (
        <div className="w-full p-2 pt-1 pb-1 md:p-4 md:pt-2 md:pb-2 border-b hover:bg-lightest flex">
          <div className="flex-none mr-2 md:mr-4 pt-1">
            <a href={`#/${tweet.profile.screenName}`}>
              <img
                src={tweet.profile.imageUrl || require('../assets/default.png')}
                className="h-12 w-12 rounded-full flex-none"
              />
            </a>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <p className="font-semibold">{tweet.profile.name}</p>
              <p className="hidden md:block text-sm text-dark ml-2">
                @{tweet.profile.screenName}
              </p>
              <p className="text-sm text-dark ml-2">·</p>
              <p className="text-sm text-dark ml-2">
                {timeago(tweet.createdAt)}
              </p>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="fas fa-angle-down text-sm ml-auto text-dark"
              />
            </div>
            {tweet.inReplyToUsers && tweet.inReplyToUsers.length > 0 && (
              <p className="text-dark text-xs md:text-sm">
                Replying to{' '}
                {tweet.inReplyToUsers
                  .map((x: any) => `@${x.screenName}`)
                  .join(',')}
              </p>
            )}
            <p className="pb-2">{tweet.text}</p>
            <div className="flex w-full">
              <div className="flex items-center text-sm text-dark w-1/4">
                <button
                  className="mr-2 rounded-full hover:bg-lighter"
                  onClick={replyToTweet}
                >
                  <FontAwesomeIcon
                    icon={faComment}
                    className="far fa-comment"
                  ></FontAwesomeIcon>
                </button>
                {tweet?.replies > 0 && <p> {tweet.replies} </p>}
              </div>
              <div className="flex items-center text-sm text-dark w-1/4">
                <button
                  className="mr-2 rounded-full hover:bg-lighter"
                  onClick={handleRetweet}
                >
                  <FontAwesomeIcon
                    icon={faRetweet}
                    className={`fas fa-retweet ${
                      isRetweeted ? 'text-green-500' : ''
                    }`}
                  ></FontAwesomeIcon>
                </button>
                {tweet.retweets > 0 && <p> {tweet.retweets} </p>}
              </div>
              <div className="flex items-center text-sm text-dark w-1/4">
                <button
                  className="mr-2 rounded-full hover:bg-lighter"
                  onClick={handleLike}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`fas fa-heart ${isLiked ? 'text-red-600' : ''}`}
                  ></FontAwesomeIcon>
                </button>
                {tweet?.likes > 0 && <p> {tweet.likes} </p>}
              </div>
              <div className="flex items-center text-sm text-dark w-1/4">
                <FontAwesomeIcon
                  icon={faShareSquare}
                  className=" mr-3"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
          <ReplyOverlay
            tweet={tweet}
            setShowReplyOverlay={replyToTweet}
            showReplyOverlay={showReplyOverlay}
          />
        </div>
      )}
    </>
  );
}

export default Tweet;
