/*
 *Objective of this file is to simulate the user actions and Api Actions
 * Api Actions which are programmed explicity by Developer(eg : PostSignUpHook)
 */

// Load .env file from root of your folder (backend)
require("dotenv").config();

const AWS = require("aws-sdk");
const fs = require("fs");
const velocityMapper = require("amplify-appsync-simulator/lib/velocity/value-mapper/mapper");
const velocityTemplate = require("amplify-velocity-template");
const GraphQL = require("../lib/graphql");
const we_invoke_confirm_user_signup = async (username, name, email) => {
  const handler =
    require("../../lib/stacks/ComputeStack/Functions/ConfirmSignUpTrigger/index").handler;

  const context = {};

  // We got this from Lumigo!
  const event = {
    version: "1",
    region: process.env.AWS_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userName: username,
    triggerSource: "PostConfirmation_ConfirmSignUp",
    request: {
      userAttributes: {
        sub: username,
        "cognito:email_alias": email,
        "cognito:user_status": "CONFIRMED",
        email_verified: "false",
        name: name,
        email: email,
      },
    },
    response: {},
  };

  await handler(event, context);
};

const we_invoke_getImageUploadUrl = async (
  username,
  extension,
  contentType
) => {
  const handler =
    require("../../lib/stacks/API_STACK/resolvers/query/GetImageUploadUrl/index").handler;

  const context = {};
  const event = {
    identity: {
      username,
    },
    arguments: {
      extension,
      contentType,
    },
  };

  return await handler(event, context);
};

/*
 * This flow should automatically trigger the ConfirmSignUpTrigger function
 */
const a_user_signs_up = async (password, name, email) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.WEB_COGNITO_USER_POOL_CLIENT_ID;
  // We will need name as we have specified as the custom attribute in our Cognito User Pool
  const signUpResponse = await cognito
    .signUp({
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "name",
          Value: name,
        },
      ],
    })
    .promise();

  const username = signUpResponse.UserSub;
  console.log(`User ${username} with email ${email} signed up`);

  // Verify user programmatically
  await cognito
    .adminConfirmSignUp({ UserPoolId: userPoolId, Username: username })
    .promise();

  console.log(`User ${username} with email ${email}confirmed `);

  return {
    username,
    name,
    email,
  };
};

const we_invoke_an_appsync_template = (templatePath, context) => {
  const template = fs.readFileSync(templatePath, "utf8");
  // Ast = Abstract Syntax Tree (Rember from TypeScrpt Book)
  const ast = velocityTemplate.parse(template);
  const compiler = new velocityTemplate.Compile(ast, {
    valueMapper: velocityMapper.map,
    escape: false,
  });
  return JSON.parse(compiler.render(context));
};

const a_user_calls_getMyProfile = async (user) => {
  const getMyProfile = `query getMyProfile {
    getMyProfile {
      backgroundImageUrl
      bio
      birthdate
      createdAt
      followersCount
      followingCount
      id
      imageUrl
      likesCounts
      location
      name
      screenName
      tweetsCount
      website
    }
  }`;

  // Make request to AppSync
  const data = await GraphQL(
    process.env.API_URL,
    getMyProfile,
    {},
    user.accessToken
  );
  // data will be on the name of the query Operation(getMyProfile)
  // You can learn all this by seeing results and error from appsync console.
  const profile = data.getMyProfile;

  console.log(`[${user.username}] - fetched profile`);

  return profile;
};

const a_user_calls_editMyProfile = async (user, input) => {
  const editMyProfile = `mutation editMyProfile($input: ProfileInput!) {
    editMyProfile(newProfile: $input) {
      backgroundImageUrl
      bio
      birthdate
      createdAt
      followersCount
      followingCount
      id
      imageUrl
      likesCounts
      location
      name
      screenName
      tweetsCount
      website
    }
  }`;
  const variables = {
    input,
  };

  const data = await GraphQL(
    process.env.API_URL,
    editMyProfile,
    variables,
    user.accessToken
  );
  const profile = data.editMyProfile;

  console.log(`[${user.username}] - edited profile`);

  return profile;
};
const a_user_calls_getImageUploadUrl = async (user, extension, contentType) => {
  const getImageUploadUrl = `query getImageUploadUrl($extension: String, $contentType: String) {
    getImageUploadUrl(extension: $extension, contentType: $contentType)
  }`;
  const variables = {
    extension,
    contentType,
  };

  const data = await GraphQL(
    process.env.API_URL,
    getImageUploadUrl,
    variables,
    user.accessToken
  );
  const url = data.getImageUploadUrl;

  console.log(`[${user.username}] - got image upload url`);

  return url;
};
module.exports = {
  we_invoke_confirm_user_signup,
  a_user_signs_up,
  we_invoke_an_appsync_template,
  a_user_calls_getMyProfile,
  a_user_calls_editMyProfile,
  we_invoke_getImageUploadUrl,
  a_user_calls_getImageUploadUrl,
};
