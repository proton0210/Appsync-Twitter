import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class UnRetweet extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;

  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.UnRetweetResolver();
  }

  public UnRetweetFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    this,
    'UnRetweet',
    {
      entry: path.join(__dirname, '../resolvers/mutations/UnRetweet/index.js'),
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

  public UnRetweetResolver() {
    return new appsync.Resolver(this, 'UnRetweetResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'unretweet',
      dataSource: this.api.addLambdaDataSource(
        'UnRetweet',
        this.UnRetweetFunction
      )
    });
  }
}
