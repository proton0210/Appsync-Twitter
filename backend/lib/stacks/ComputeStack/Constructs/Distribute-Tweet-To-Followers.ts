import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
export class DistributeTweetsToFollowers extends Construct {
  public readonly DistributeTweetsToFollowers: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Nodejs Construct
    const DistributeTweetsToFollowers =
      new cdk.aws_lambda_nodejs.NodejsFunction(
        this,
        'DistributeTweetsToFollowers',
        {
          entry: path.join(
            __dirname,
            '../Functions/DistributeTweetsToFollowers/index.js'
          ),
          handler: 'handler',
          runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
          memorySize: 526,
          timeout: cdk.Duration.seconds(30),
          environment: {
            TWEETS_TABLE: 'TweetsTable',
            TIMELINES_TABLE: 'TimelinesTable'
          }
        }
      );

    this.DistributeTweetsToFollowers = DistributeTweetsToFollowers;
  }
}
