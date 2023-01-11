// Configure your AWS resources here
const awsconfig = {
  Auth: {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    mandatorySignIn: true,
    storage: window.sessionStorage
  },
  aws_appsync_region: process.env.REACT_APP_REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_API
};

export default awsconfig;
