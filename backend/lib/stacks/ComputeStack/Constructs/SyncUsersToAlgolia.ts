import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
export class SyncUsersToAlgolia extends Construct {
  public readonly SyncUsersToAlgolia: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // allow ssm policy
    const ssmPolicy = new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['ssm:*'],
      resources: ['*']
    });

    // Nodejs Construct
    const SyncUsersToAlgolia = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      'SyncUsersToAlgolia',
      {
        entry: path.join(__dirname, '../Functions/SyncUsersToAlgolia/index.js'),
        handler: 'handler',
        runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
        memorySize: 526,
        timeout: cdk.Duration.seconds(30)
      }
    );

    // add policy to lambda
    SyncUsersToAlgolia.addToRolePolicy(ssmPolicy);

    this.SyncUsersToAlgolia = SyncUsersToAlgolia;
  }
}
