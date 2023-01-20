import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class SendDirectMessage extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;

  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.SendDirectMessageResolver();
  }

  public SendDirectMessagefunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    this,
    'SendDirectMessageFunction',
    {
      entry: path.join(
        __dirname,
        '../resolvers/mutations/SendDirectMessage/index.js'
      ),
      handler: 'handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      environment: {
        CONVERSATIONS_TABLE: 'ConversationsTable',
        DIRECT_MESSAGES_TABLE: 'DirectMessagesTable'
      }
    }
  );

  public SendDirectMessageResolver() {
    return new appsync.Resolver(this, 'SendDirectMessageResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'sendDirectMessage',
      dataSource: this.api.addLambdaDataSource(
        'SendDirectMessage',
        this.SendDirectMessagefunction
      )
    });
  }
}
