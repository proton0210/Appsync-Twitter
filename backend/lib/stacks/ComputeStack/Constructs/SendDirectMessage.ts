import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class SendDirectMessage extends Construct {
  public readonly SendDirectMessagefunction: cdk.aws_lambda_nodejs.NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const SendDirectMessagefunction = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      'SendDirectMessageFunction',
      {
        entry: path.join(__dirname, '../Functions/SendDirectMessage/index.js'),
        handler: 'handler',
        memorySize: 128,
        timeout: cdk.Duration.seconds(10),
        environment: {
          CONVERSATIONS_TABLE: 'ConversationsTable',
          DIRECT_MESSAGES_TABLE: 'DirectMessagesTable'
        }
      }
    );

    this.SendDirectMessagefunction = SendDirectMessagefunction;
  }
}
