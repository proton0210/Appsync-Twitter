import { SendDirectMessage } from './Constructs/SendDirectMessage';
import { NotifyLiked } from './Constructs/NotifyLiked';
import { SyncTweetsToAlgolia } from './Constructs/SyncTweetsToAlgolia';
import { SyncUsersToAlgolia } from './Constructs/SyncUsersToAlgolia';
import { DistributeTweetsToFollowers } from './Constructs/Distribute-Tweet-To-Followers';
import { DistributeTweet } from './Constructs/Distribute-Tweet';
import { ConfirmUserSignUp } from './Constructs/confirm-user';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Notify } from './Constructs/Notify';
import { NotifyDMed } from './Constructs/NotifyDmed';

export class ComputeStack extends cdk.Stack {
  public readonly postConfirmationHook: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly distributedTweet: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly distributeTweetToFollowers: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly Notify: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly NotifyLiked: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly NotifyDMed: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly syncUsersToAlgolia: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly syncTweetsToAlgolia: cdk.aws_lambda_nodejs.NodejsFunction;
  public readonly sendDirectMessage: cdk.aws_lambda_nodejs.NodejsFunction;

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

    const syncUsersToAlgolia = new SyncUsersToAlgolia(
      this,
      'SyncUsersToAlgolia'
    );

    const syncTweetsToAlgolia = new SyncTweetsToAlgolia(
      this,
      'SyncTweetsToAlgolia'
    );

    const notify = new Notify(this, 'Notify');

    const notifyLiked = new NotifyLiked(this, 'NotifyLiked');
    const notifyDmed = new NotifyDMed(this, 'NotifyDMed');
    const sendDirectMessage = new SendDirectMessage(this, 'SendDirectMessage');

    this.postConfirmationHook = confirmUserSignUpTrigger.confirmUserSignUp;
    this.distributedTweet = distributedTweet.DistributeTweet;
    this.distributeTweetToFollowers =
      distributeTweetToFollowers.DistributeTweetsToFollowers;
    this.syncUsersToAlgolia = syncUsersToAlgolia.SyncUsersToAlgolia;
    this.syncTweetsToAlgolia = syncTweetsToAlgolia.SyncTweetsToAlgolia;
    this.Notify = notify.Notify;
    this.NotifyLiked = notifyLiked.NotifyLiked;
    this.NotifyDMed = notifyDmed.NotifyDMed;
    this.sendDirectMessage = sendDirectMessage.SendDirectMessagefunction;
  }
}
