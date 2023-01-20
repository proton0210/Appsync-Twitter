import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ConversationsTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'ConversationsTable', {
      partitionKey: {
        name: 'userId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'otherUserId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'ConversationsTable'
    });

    // add global secondary index
    table.addGlobalSecondaryIndex({
      indexName: 'byUserId',
      partitionKey: {
        name: 'userId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'lastModified',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.ALL
    });

    cdk.Tags.of(table).add('Name', 'ConversationTable');

    //member variable for API stack
    this.table = table;
  }
}
