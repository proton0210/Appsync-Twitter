import { ApiStackProps } from "./../../../Interfaces/api-interface";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as path from "path";
export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new appsync.GraphqlApi(this, "Api", {
      name: "twitter-api",
      schema: appsync.Schema.fromAsset(
        path.join(__dirname, "Schema/schema.api.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
          },
        },
      },
    });
  }
}
