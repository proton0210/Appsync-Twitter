import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
export class DistributeTweet extends Construct {
  public readonly DistributeTweet: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Nodejs Construct
    const DistributeTweet = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      'DistributeTweet',
      {
        entry: path.join(__dirname, '../Functions/DistributeTweets/index.js'),
        handler: 'handler',
        runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
        memorySize: 526,
        timeout: cdk.Duration.seconds(30),
        environment: {
          RELATIONSHIPS_TABLE: 'RelationshipsTable',
          TIMELINES_TABLE: 'TimelinesTable'
        }
      }
    );

    this.DistributeTweet = DistributeTweet;
  }
}
