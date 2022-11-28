import * as cdk from "aws-cdk-lib";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";
import * as path from "path";
export class GetImageUploadURL extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;
  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.ImageUploadUrlResolver();
  }

  getImageUploadURLfunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    this,
    "GetImageUploadURL",
    {
      entry: path.join(
        __dirname,
        "../resolvers/query/GetImageUploadUrl/index.js"
      ),
      handler: "handler",
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
    }
  );

  public ImageUploadUrlResolver() {
    return new appsync.Resolver(this, "getImageUploadUrl", {
      api: this.api,
      typeName: "Query",
      fieldName: "getImageUploadUrl",
      dataSource: this.api.addLambdaDataSource(
        "getImageUploadUrl",
        this.getImageUploadURLfunction
      ),
    });
  }
}
