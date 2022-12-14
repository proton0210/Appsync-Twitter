import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Amplify from 'aws-amplify'



Amplify.Auth.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_xxxxxxxxx',
  userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
})


const myAppConfig = {
  aws_appsync_graphqlEndpoint: 'https://https://hj4awsi6dfgbfmbpltrfcd42ra.appsync-api.us-east-1.amazonaws.com/graphql.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}

Amplify.Amplify.configure(myAppConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
