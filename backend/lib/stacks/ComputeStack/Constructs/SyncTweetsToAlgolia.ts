import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
export class SyncTweetsToAlgolia extends Construct {
  public readonly SyncTweetsToAlgolia: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const ssmPolicy = new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['ssm:*'],
      resources: ['*']
    });

    // Nodejs Construct
    const SyncTweetsToAlgolia = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      'SyncTweetsToAlgolia',
      {
        entry: path.join(
          __dirname,
          '../Functions/SyncTweetsToAlgolia/index.js'
        ),
        handler: 'handler',
        runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
        memorySize: 526,
        timeout: cdk.Duration.seconds(30)
      }
    );

    // add policy to lambda
    SyncTweetsToAlgolia.addToRolePolicy(ssmPolicy);

    this.SyncTweetsToAlgolia = SyncTweetsToAlgolia;
  }
}
