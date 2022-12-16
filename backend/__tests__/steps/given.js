/*
 * Objective of this file is to create Mock data for our tests
 */
const AWS = require('aws-sdk');
require('dotenv').config();
const chance = require('chance').Chance();
const velocityUtil = require('amplify-appsync-simulator/lib/velocity/util');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

const { RELATIONSHIPS_TABLE } = process.env;

const a_random_user = () => {
  const firstName = chance.first({ nationality: 'en' });
  const lastName = chance.last({ nationallity: 'en' });
  const suffix = chance.string({
    length: 4,
    pool: 'abcdefghijklmnopqrstuvwxyz'
  });
  const name = `${firstName} ${lastName} ${suffix}`;
  const password = chance.string({ length: 8 });
  const email = `${firstName}-${lastName}-${suffix}@appsyncmasterclass.com`;
  return { name, password, email };
};

const an_appsync_context = (identity, args, result, source, info) => {
  const util = velocityUtil.create([], new Date(), Object());

  // VTL works same for (args & arguments) and (ctx & context)
  const context = {
    identity,
    args,
    arguments: args,
    result,
    source,
    info
  };
  return {
    context,
    ctx: context,
    util,
    utils: util
  };
};

const an_authenticated_user = async () => {
  const { name, email, password } = a_random_user();

  const cognito = new AWS.CognitoIdentityServiceProvider();

  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.WEB_COGNITO_USER_POOL_CLIENT_ID;

  const signUpResp = await cognito
    .signUp({
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: 'name', Value: name }]
    })
    .promise();

  const username = signUpResp.UserSub;

  console.log(`[${email}] - user has signed up [${username}]`);

  await cognito
    .adminConfirmSignUp({
      UserPoolId: userPoolId,
      Username: username
    })
    .promise();
  // Post Confirmation Lambda Trigger
  console.log(`[${email}] - confirmed sign up`);
  /*
   * This username equates to the DynamoDB id in our table courtesy of Post Confirmation Lambda Hook.
   */
  const auth = await cognito
    .initiateAuth({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    })
    .promise();

  console.log(`[${email}] - signed in`);

  return {
    username,
    name,
    email,
    idToken: auth.AuthenticationResult.IdToken,
    accessToken: auth.AuthenticationResult.AccessToken
  };
};

const a_user_follows_another = async (userId, otherUserId) => {
  await DocumentClient.put({
    TableName: RELATIONSHIPS_TABLE,
    Item: {
      userId,
      sk: `FOLLOWS_${otherUserId}`,
      otherUserId,
      createdAt: new Date().toJSON()
    }
  }).promise();
};
module.exports = {
  a_random_user,
  an_appsync_context,
  an_authenticated_user,
  a_user_follows_another
};
