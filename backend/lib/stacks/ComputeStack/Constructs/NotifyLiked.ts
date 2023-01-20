import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
export class NotifyLiked extends Construct {
  public readonly NotifyLiked: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // create iam policy for accesing appsync
    const appsyncPolicy = new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['appsync:GraphQL', 'dynamodb:*'],
      resources: ['*']
    });

    // Nodejs Construct
    const NotifyLiked = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'NotifyLiked', {
      entry: path.join(__dirname, '../Functions/NotifyLiked/index.js'),
      handler: 'handler',
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 526,
      timeout: cdk.Duration.seconds(30),
      environment: {
        GRAPHQL_API_URL:
          'https://hj4awsi6dfgbfmbpltrfcd42ra.appsync-api.us-east-1.amazonaws.com/graphql',
          LIKES_TABLE: 'LikesTable'
      }
    });

    // add policy to lambda
    NotifyLiked.addToRolePolicy(appsyncPolicy);

    this.NotifyLiked = NotifyLiked;
  }
}
