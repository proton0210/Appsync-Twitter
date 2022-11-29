import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class Tweet extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;

  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.ImageUploadUrlResolver();
  }

  public Tweetfunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    this,
    'TweetFunction',
    {
      entry: path.join(__dirname, '../resolvers/mutations/Tweet/index.js'),
      handler: 'handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      environment: {
        USERS_TABLE: 'UsersTable',
        TWEETS_TABLE: 'TweetsTable',
        TIMELINES_TABLE: 'TimelinesTable'
      }
    }
  );

  public ImageUploadUrlResolver() {
    return new appsync.Resolver(this, 'TweetResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'tweet',
      dataSource: this.api.addLambdaDataSource('Tweet', this.Tweetfunction)
    });
  }
}
