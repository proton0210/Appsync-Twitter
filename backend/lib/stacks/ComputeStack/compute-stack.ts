import { DistributeTweetsToFollowers } from './Constructs/Distribute-Tweet-To-Followers';
import { DistributeTweet } from './Constructs/Distribute-Tweet';
import { ConfirmUserSignUp } from './Constructs/confirm-user';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ComputeStack extends cdk.Stack {
  public readonly postConfirmationHook: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly distributedTweet: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly distributeTweetToFollowers: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const confirmUserSignUpTrigger = new ConfirmUserSignUp(
      this,
      'ConfirmUserSignUp'
    );
    const distributedTweet = new DistributeTweet(this, 'DistributeTweet');
    const distributeTweetToFollowers = new DistributeTweetsToFollowers(
      this,
      'DistributeTweetToFollowers'
    );

    this.postConfirmationHook = confirmUserSignUpTrigger.confirmUserSignUp;
    this.distributedTweet = distributedTweet.DistributeTweet;
    this.distributeTweetToFollowers =
      distributeTweetToFollowers.DistributeTweetsToFollowers;
  }
}
