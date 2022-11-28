import { GetMyProfileResolver } from "./Constructs/GetMyProfileConstruct";
import { ApiStackProps } from "./../../../Interfaces/api-interface";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as path from "path";
import { EditMyProfile } from "./Constructs/EditMyProfileConstruct";
import { GetImageUploadURL } from "./Constructs/GetImageUploadUrlConstruct";
export class ApiStack extends cdk.Stack {
  public api: appsync.GraphqlApi;
  public props: ApiStackProps;
  public imageUploadFunction: cdk.aws_lambda_nodejs.NodejsFunction;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    this.api = new appsync.GraphqlApi(this, "Api", {
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
    this.props = props;
    this.queries();
    this.mutations();

    //output API URL
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: this.api.graphqlUrl,
    });
  }

  public queries() {
    new GetMyProfileResolver(
      this,
      "QueryGetMyProfileResolver",
      this.api,
      this.props.usersTable
    ).resolver;

    const getImageUploadUrl = new GetImageUploadURL(
      this,
      "QueryGetImageUploadUrl",
      this.api
    );
    getImageUploadUrl.resolver;
    this.imageUploadFunction = getImageUploadUrl.getImageUploadURLfunction;
  }
  // id string should be unique for each construct
  public mutations() {
    new EditMyProfile(
      this,
      "EditMyProfileResolver",
      this.api,
      this.props.usersTable
    ).resolver;
  }
}
