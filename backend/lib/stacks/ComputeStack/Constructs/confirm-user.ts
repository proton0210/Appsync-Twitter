import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
export class ConfirmUserSignUp extends Construct {
  public readonly confirmUserSignUp: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Nodejs Construct
    const confirmUserSignUp = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "ConfirmUserSignUp",
      {
        entry: path.join(
          __dirname,
          "../Functions/ConfirmSignUpTrigger/index.js"
        ),
        handler: "handler",
        runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
        memorySize: 526,
        timeout: cdk.Duration.seconds(30),
        environment: {
          USERS_TABLE: "UsersTable",
        },
      }
    );

    this.confirmUserSignUp = confirmUserSignUp;
  }
}
