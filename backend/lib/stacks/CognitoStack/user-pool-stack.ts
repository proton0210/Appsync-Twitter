import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
export interface UserPoolStackProps extends cdk.StackProps {
  postConfirmationHook: cdk.aws_lambda_nodejs.NodejsFunction;
}

export class UserPoolStack extends cdk.Stack {
  public readonly userPool: cdk.aws_cognito.UserPool;

  constructor(scope: Construct, id: string, props: UserPoolStackProps) {
    super(scope, id, props);
    //Cognito User Pool

    //Once the Pool is created you cannot change the schema...
    const userPool = new cdk.aws_cognito.UserPool(this, "UserPool", {
      userPoolName: "TwitterUserPool",
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireDigits: false,
        requireUppercase: false,
        requireSymbols: false,
      },
      signInAliases: {
        email: true,
      },
      customAttributes: {
        name: new cdk.aws_cognito.StringAttribute({
          mutable: true,
        }),
      },
    });
    userPool.addTrigger(
      cdk.aws_cognito.UserPoolOperation.POST_CONFIRMATION,
      props.postConfirmationHook
    );

    //Member Variable for API stack
    this.userPool = userPool;

    const userPoolWebClient = new cdk.aws_cognito.UserPoolClient(
      this,
      "TwitterUserPool",
      {
        userPool,
        authFlows: {
          userPassword: true,
          userSrp: true,
        },
      }
    );

    // Cognito User Pool id
    const userPoolId = new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
      exportName: "UserPoolId",
    });

    const WebClientId = new cdk.CfnOutput(this, "Web Client Id ", {
      value: userPoolWebClient.userPoolClientId,
      exportName: "Web-Client-Id",
    });
  }
}
