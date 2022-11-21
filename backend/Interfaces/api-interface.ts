import * as cdk from "aws-cdk-lib";

export interface ApiStackProps extends cdk.StackProps {
  userPool: cdk.aws_cognito.UserPool;
}
