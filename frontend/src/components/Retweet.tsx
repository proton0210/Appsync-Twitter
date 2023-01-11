import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tweet from './Tweet';
import { Auth } from 'aws-amplify';

export default function Retweet({ tweet }: { tweet: any }) {
  const [label, setLabel] = React.useState('');

  React.useEffect(() => {
    const getLabel = async () => {
      const user = await Auth.currentUserInfo();
      if (user.username === tweet.profile.id) {
        setLabel(`You Retweeted`);
      } else {
        setLabel(`@${tweet.profile.screenName} retweeted`);
      }
    };
    getLabel();
  }, []);

  return (
    <>
      <div className="w-full border-b hover:bg-lightest flex flex-col">
        <div className="pt-4 pl-4 flex flex-row">
          <div className="w-12 mr-4 flex justify-end">
            <FontAwesomeIcon
              icon={faRetweet}
              className="text-sm pt-1 fas fa-retweet text-dark"
            />
          </div>
          <p className="text-sm text-dark">{label}</p>
        </div>

        <Tweet tweet={tweet} />
      </div>
    </>
  );
}
