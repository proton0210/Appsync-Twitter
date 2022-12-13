import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class Reply extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;

  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.ReplyResolver();
  }

  public Replyfunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    this,
    'ReplyFunction',
    {
      entry: path.join(__dirname, '../resolvers/mutations/Reply/index.js'),
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

  public ReplyResolver() {
    return new appsync.Resolver(this, 'ReplyResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'reply',
      dataSource: this.api.addLambdaDataSource('Reply', this.Replyfunction)
    });
  }
}
