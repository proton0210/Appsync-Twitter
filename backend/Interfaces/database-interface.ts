import * as cdk from 'aws-cdk-lib';

export interface DataBaseStackProps extends cdk.StackProps {
  postConfirmationHook: cdk.aws_lambda_nodejs.NodejsFunction;
  distributedTweet: cdk.aws_lambda_nodejs.NodejsFunction;
  distributeTweetWithFollowers: cdk.aws_lambda_nodejs.NodejsFunction;
  syncUserstoAlgolia: cdk.aws_lambda_nodejs.NodejsFunction;
  syncTweetsToAlgolia: cdk.aws_lambda_nodejs.NodejsFunction;
  Notify: cdk.aws_lambda_nodejs.NodejsFunction;
  NotifyLiked: cdk.aws_lambda_nodejs.NodejsFunction;
}
