const algoliasearch = require('algoliasearch');

let usersIndex, tweetsIndex;

const initUsersIndex = async (appId, key) => {
  if (!usersIndex) {
    const client = algoliasearch(appId, key);
    usersIndex = client.initIndex(`users_prod`);
    await usersIndex.setSettings({
      searchableAttributes: ['name', 'screenName', 'bio']
    });
  }

  return usersIndex;
};

const initTweetsIndex = async (appId, key) => {
  if (!tweetsIndex) {
    const client = algoliasearch(appId, key);
    tweetsIndex = client.initIndex(`tweets_prod`);
    await tweetsIndex.setSettings({
      attributesForFaceting: ['hashTags'],
      searchableAttributes: ['text'],
      customRanking: ['desc(createdAt)']
    });
  }

  return tweetsIndex;
};

module.exports = {
  initUsersIndex,
  initTweetsIndex
};
