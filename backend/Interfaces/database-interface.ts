import * as cdk from "aws-cdk-lib";

export interface DataBaseStackProps extends cdk.StackProps {
  postConfirmationHook: cdk.aws_lambda_nodejs.NodejsFunction;
}
