import { ConfirmUserSignUp } from "./Constructs/confirm-user";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class ComputeStack extends cdk.Stack {
  public readonly postConfirmationHook: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const confirmUserSignUpTrigger = new ConfirmUserSignUp(
      this,
      "ConfirmUserSignUp"
    );
    this.postConfirmationHook = confirmUserSignUpTrigger.confirmUserSignUp;
  }
}
