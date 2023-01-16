import { AmplifyStack } from './../lib/stacks/AmplifyStack/amplify-stack';
import { StorageStack } from './../lib/stacks/StorageStack/storage-stack';
import { DataBaseStack } from './../lib/stacks/DatabaseStack/database-stack';
import { ComputeStack } from './../lib/stacks/ComputeStack/compute-stack';
import { UserPoolStack } from './../lib/stacks/CognitoStack/user-pool-stack';
import { ApiStack } from './../lib/stacks/API_STACK/api-stack';
// #!/usr/bin/env node

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

/*
 * First We Deploy the User Pool Stack to get the User Pool Id for Api Stack
 * Order Matters
 * User Pool for handling Signups and Logins and users
 * User Pool Client for Web ,Mobile Clients
 */
const app = new cdk.App();
const computeStack = new ComputeStack(app, 'ComputeStack');
const userPoolStack = new UserPoolStack(app, 'UserPoolStack', {
  postConfirmationHook: computeStack.postConfirmationHook
});

const dataBaseStack = new DataBaseStack(app, 'DataBaseStack', {
  postConfirmationHook: computeStack.postConfirmationHook,
  distributedTweet: computeStack.distributedTweet,
  distributeTweetWithFollowers: computeStack.distributeTweetToFollowers,
  syncUserstoAlgolia: computeStack.syncUsersToAlgolia,
  syncTweetsToAlgolia: computeStack.syncTweetsToAlgolia
});

const apiStack = new ApiStack(app, 'ApiStack', {
  userPool: userPoolStack.userPool,
  usersTable: dataBaseStack.usersTable.table,
  tweetsTable: dataBaseStack.tweetsTable.table,
  timelinesTable: dataBaseStack.timelinesTable.table,
  likesTable: dataBaseStack.likesTable.table,
  retweetsTable: dataBaseStack.retweetTable.table,
  relationshipsTable: dataBaseStack.relationShipsTable.table
});

const storageStack = new StorageStack(app, 'StorageStack', {
  imageUploadFunction: apiStack.imageUploadFunction
});
const frontEndStack = new AmplifyStack(app, 'AmplifyStack');
