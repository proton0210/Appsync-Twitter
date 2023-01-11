import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

  faSearch,
  faCog,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
const trending = [
  {
    top: 'Trending in NL',
    title: 'REDALERT',
    bottom: '7,451 tweets',
    id: 'NL-READALERT'
  },
  { top: 'Music', title: 'We Won', bottom: '135K Tweets', id: 'MUSIC-WE_WON' },
  { top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets', id: 'POP-BLUE_IVY' },
  {
    top: 'Trending in NL',
    title: 'Zwarte Piet',
    bottom: '13.9k tweets',
    id: 'NL-ZWARTE_PIET'
  },
  {
    top: 'Trending',
    title: 'When Beyonce',
    bottom: '25.4k tweets',
    id: 'TRENDING-WHEN_BEYONCE'
  }
];
const followSuggestions = [
  {
    imageUrl: 'https://i.imgur.com/jv6Hufs.jpg',
    name: 'Senzo',
    screenName: '@senzo_HQ',
    id: 'senzo_HQ'
  },
  {
    imageUrl: 'https://i.imgur.com/VXcv5Sj.jpg',
    name: 'Ant Stanley',
    screenName: '@IamStan',
    id: 'IamStan'
  },
  {
    imageUrl: 'https://i.imgur.com/wHoKLev.jpg',
    name: 'Hanna',
    screenName: '@bestofallhans',
    id: 'bestofallhans'
  }
];
export default function RightNav() {
  return (
    <div className="hidden md:block w-1/3 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative min-w-max">
      <div>
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute mt-2 ml-5 text-sm text-light"
        ></FontAwesomeIcon>
        <input
          className="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
          placeholder="Search Tweet"
        />
      </div>

      <div className="w-full rounded-lg bg-lightest">
        <div className="flex items-center justify-between p-3">
          <p className="text-lg font-bold">Trends for you</p>
          <FontAwesomeIcon
            icon={faCog}
            className="fas fa-cog text-lg text-blue"
          ></FontAwesomeIcon>
        </div>
        {trending.map((trend) => (
          <button
            key={trend.id}
            className="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter"
          >
            <div>
              <p className="text-sm text-left leading-tight text-dark">
                {trend.top}
              </p>
              <p className="font-bold text-left leading-tight">{trend.title}</p>
              <p className="text-left leading-tight text-dark">
                {trend.bottom}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="fa-angle-down text-lg text-dark"
            ></FontAwesomeIcon>
          </button>
        ))}
        <button className="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>

      <div className="w-full rounded-lg bg-lightest my-4">
        <div className="p-3">
          <p className="text-lg font-bold">Who to follow</p>
        </div>

        {followSuggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            className="w-full flex hover:bg-lighter p-3 border-t border-lighter"
          >
            <img src={suggestion.imageUrl} className="w-12 h-12 rounded-full" />
            <div className="hidden lg:block ml-4">
              <p className="text-left text-sm font-bold leading-tight">
                {suggestion.name}
              </p>
              <p className="text-left text-sm leading-tight text-dark">
                {suggestion.screenName}
              </p>
            </div>
            <button className="ml-auto text-sm text-blue font-bold px-4 py-1 rounded-full border border-blue m-2">
              Follow
            </button>
          </button>
        ))}
        <button className="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>
    </div>
  );
}
