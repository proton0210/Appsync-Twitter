import { UserPoolStack } from "./../lib/stacks/CognitoStack/user-pool-stack";
import { ApiStack } from "./../lib/stacks/API_STACK/api-stack";
// #!/usr/bin/env node

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

/*
 * First We Deploy the User Pool Stack to get the User Pool Id for Api Stack
 * Order Matters
 * User Pool for handling Signups and Logins and users
 * User Pool Client for Web ,Mobile Clients
 */
const app = new cdk.App();
const userPoolStack = new UserPoolStack(app, "UserPoolStack", {});

const apiStack = new ApiStack(app, "ApiStack", {
  userPool: userPoolStack.userPool,
});
