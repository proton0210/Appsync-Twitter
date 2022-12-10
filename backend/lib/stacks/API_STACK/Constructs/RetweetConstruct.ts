import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class Retweet extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;

  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.RetweetResolver();
  }

  public Retweetfunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    this,
    'RetweetFunction',
    {
      entry: path.join(__dirname, '../resolvers/mutations/Retweet/index.js'),
      handler: 'handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(20),
      environment: {
        USERS_TABLE: 'UsersTable',
        TWEETS_TABLE: 'TweetsTable',
        TIMELINES_TABLE: 'TimelinesTable',
        RETWEETS_TABLE: 'RetweetsTable'
      }
    }
  );

  public RetweetResolver() {
    return new appsync.Resolver(this, 'RetweetResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'retweet',
      dataSource: this.api.addLambdaDataSource('Retweet', this.Retweetfunction)
    });
  }
}
