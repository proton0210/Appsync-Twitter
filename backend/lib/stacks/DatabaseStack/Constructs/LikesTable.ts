import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class LikesTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'LikesTable', {
      partitionKey: {
        name: 'userId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'tweetId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      stream: cdk.aws_dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'LikesTable'
    });

    cdk.Tags.of(table).add('Name', 'LikesTable');

    //member variable for API stack
    this.table = table;
  }
}
