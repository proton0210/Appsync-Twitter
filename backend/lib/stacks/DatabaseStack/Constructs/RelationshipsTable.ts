import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class RelationshipsTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'RelationshipsTable', {
      partitionKey: {
        name: 'userId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        //opaque key for the relationship
        name: 'sk',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'RelationshipsTable'
    });

    //add a global secondary index for the relationship
    table.addGlobalSecondaryIndex({
      indexName: 'byOtherUser',
      partitionKey: {
        name: 'otherUserId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'sk',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.ALL
    });

    cdk.Tags.of(table).add('Name', 'RelationshipsTable');

    //member variable for API stack
    this.table = table;
  }
}
