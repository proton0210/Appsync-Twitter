import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class UsersTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'UsersTable', {
      partitionKey: {
        name: 'id',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      stream: cdk.aws_dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'UsersTable'
    });
    table.addGlobalSecondaryIndex({
      indexName: 'byScreenName',
      partitionKey: {
        name: 'screenName',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.ALL
    });

    cdk.Tags.of(table).add('Name', 'UsersTable');

    //member variable for API stack
    this.table = table;
  }
}
