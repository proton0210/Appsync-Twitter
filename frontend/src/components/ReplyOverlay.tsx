import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFilm,
  faImage,
  faSmile,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import timeago from '../server-utils/timeago';

import { replyTweet } from '../server-utils/replyTweet';
import { useQueryClient } from 'react-query';

function ReplyOverlay({
  tweet,
  setShowReplyOverlay,
  showReplyOverlay
}: {
  tweet: any;
  setShowReplyOverlay: any;
  showReplyOverlay: any;
}) {
  const queryClient = useQueryClient();
  const [text, setText] = React.useState('');

  // handle react form event

  const sendReply = async (e: any) => {
    e.preventDefault();
    try {
      await replyTweet(tweet.id, text);
      console.log('reply sent');
      queryClient.refetchQueries('fetchTimeline');
      setText('');
      setShowReplyOverlay();
    } catch (e: any) {
      console.log(e.errors);
    }
  };
  return (
    <>
      {showReplyOverlay && (
        <div className="fixed w-full h-full z-10 top-0 left-0 flex items-center justify-center">
          <div
            className="absolute w-full h-full bg-gray-900 opacity-50"
            onClick={setShowReplyOverlay}
          ></div>

          <div
            className="modal-main bg-white mx-auto rounded-lg z-0 overflow-y-auto"
            style={{ width: '40%' }}
          >
            <div className="pl-1 pr-4 py-1 h-16 border-b-2 border-lightblue">
              <div className="flex flex-row mt-1 ml-4">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={setShowReplyOverlay}
                  className="fas fa-times text-blue text-2xl mb-8 mr-6 rounded-full bg-white p-2 px-3 hover:bg-lightblue"
                ></FontAwesomeIcon>
              </div>
            </div>

            {tweet.profile && (
              <div className="border-l-2 border-r-2 border-white flex flex-col">
                <div className="p-3 flex flex-row">
                  <div className="flex-none mr-4">
                    <img
                      src={
                        `${tweet.profile.imageUrl}` ||
                        require('../assets/default.png')
                      }
                      className="h-12 w-12 rounded-full flex-none"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center w-full">
                      <p className="font-semibold">{tweet.profile.name}</p>
                      <p className="text-sm text-dark ml-2">
                        @{tweet.profile.screenName}
                      </p>
                      <p className="text-sm text-dark ml-2">.</p>
                      <p className="text-sm text-dark ml-2">
                        {timeago(tweet.createdAt)}
                      </p>
                    </div>
                    <p className="py-2">{tweet.text}</p>
                  </div>
                </div>

                <div className="p-3 flex flex-row">
                  <div className="flex-none mr-4">
                    <img
                      src={
                        `${tweet.profile.imageUrl}` ||
                        require('../assets/default.png')
                      }
                      className="h-12 w-12 rounded-full flex-none"
                    />
                  </div>

                  <div className="w-full mb-2">
                    <form onSubmit={sendReply} className="w-full relative">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Tweet your reply"
                        className="w-full focus:outline-none mt-3 pb-3"
                      ></textarea>
                      <div>
                        <FontAwesomeIcon
                          icon={faImage}
                          className="text-lg text-blue mr-4 far fa-image"
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                          icon={faFilm}
                          className="text-lg text-blue mr-4 fas fa-film"
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                          icon={faChartBar}
                          className="text-lg text-blue mr-4 far fa-chart-bar"
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                          icon={faSmile}
                          className="text-lg text-blue mr-4 far fa-smile"
                        ></FontAwesomeIcon>
                      </div>
                      <button
                        type="submit"
                        className={
                          'h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue rounded-full absolute bottom-0 right-0' +
                          `${text ? '' : ' opacity-50 cursor-not-allowed'}`
                        }
                      >
                        Reply
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ReplyOverlay;
