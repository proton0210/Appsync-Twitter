import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class RetweetsTable extends Construct {
  public table: cdk.aws_dynamodb.Table;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new cdk.aws_dynamodb.Table(this, 'RetweetsTable', {
      partitionKey: {
        name: 'userId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'tweetId',
        type: cdk.aws_dynamodb.AttributeType.STRING
      },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: 'RetweetsTable'
    });

    cdk.Tags.of(table).add('Name', 'RetweetsTable');

    //member variable for API stack
    this.table = table;
  }
}
