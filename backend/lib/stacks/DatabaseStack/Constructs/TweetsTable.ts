import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class TweetsTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'TweetsTable', {
      partitionKey: {
        name: 'id',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },

      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'TweetsTable'
    });
    table.addGlobalSecondaryIndex({
      indexName: 'byCreator',
      partitionKey: {
        name: 'creator',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'id',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.ALL
    });
    table.addGlobalSecondaryIndex({
      indexName: 'retweetsByCreator',
      partitionKey: {
        name: 'creator',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'retweetOf',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.ALL
    });

    cdk.Tags.of(table).add('Name', 'TweetsTable');

    //member variable for API stack
    this.table = table;
  }
}
