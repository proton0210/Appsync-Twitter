import {
  GITHUB_USER_NAME,
  REPO_NAME,
  COGNITO_USER_POOL_ID,
  WEB_COGNITO_USER_POOL_CLIENT_ID,
  REGION,
  GRAPHQL_URL
} from './../../../variables';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import { Construct } from 'constructs';
export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    const amplifyApp = new amplify.App(this, `Amplify Twitter Frontend App`, {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: GITHUB_USER_NAME,
        repository: REPO_NAME,
        oauthToken: cdk.SecretValue.secretsManager('github-appsync-token')
      }),
      environmentVariables: {
        USER_POOL_ID: COGNITO_USER_POOL_ID,
        USER_POOL_CLIENT_ID: WEB_COGNITO_USER_POOL_CLIENT_ID,
        REGION: REGION,
        APPSYNC_API: GRAPHQL_URL
      }
    });
    amplifyApp.addBranch('main');
  }
}
