import { UsersTable } from "./../../DatabaseStack/Constructs/UsersTable";
import * as cdk from "aws-cdk-lib";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";
import * as path from "path";
export class GetMyProfileResolver extends Construct {
  public readonly getMyProfileResolver: appsync.Resolver;
  public api: appsync.GraphqlApi;
  public usersTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    usersTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.usersTable = usersTable;
    this.resolver = this.createGetMyProfileResolver();
  }
  public createGetMyProfileResolver() {
    return this.api
      .addDynamoDbDataSource("UsersTable", this.usersTable)
      .createResolver({
        typeName: "Query",
        fieldName: "getMyProfile",
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            "../resolvers/query/getMyProfile/getMyProfileRequest.vtl"
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            "../resolvers/query/getMyProfile/getMyProfileResponse.vtl"
          )
        ),
      });
  }
}
