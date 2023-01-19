import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
export class Notify extends Construct {
  public readonly Notify: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // create iam policy for accesing appsync
    const appsyncPolicy = new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['appsync:GraphQL', 'dynamodb:*'],
      resources: ['*']
    });

    // Nodejs Construct
    const Notify = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Notify', {
      entry: path.join(__dirname, '../Functions/Notify/index.js'),
      handler: 'handler',
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 526,
      timeout: cdk.Duration.seconds(30),
      environment: {
        GRAPHQL_API_URL:
          'https://6ya7lm3jtnhtrk3vey5iwm656e.appsync-api.us-east-1.amazonaws.com/graphql',
        TWEETS_TABLE: 'TweetsTable'
      }
    });

    // add policy to lambda
    Notify.addToRolePolicy(appsyncPolicy);

    this.Notify = Notify;
  }
}
