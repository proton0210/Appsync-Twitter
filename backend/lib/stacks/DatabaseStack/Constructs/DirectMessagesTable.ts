import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DirectMessagesTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'DirectMessagesTable', {
      partitionKey: {
        name: 'conversationId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'messageId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      stream: cdk.aws_dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'DirectMessagesTable'
    });

    cdk.Tags.of(table).add('Name', 'DirectMessagesTable');

    //member variable for API stack
    this.table = table;
  }
}
