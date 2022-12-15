import * as cdk from "aws-cdk-lib";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";
import * as path from "path";
export class GetProfile extends Construct {
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
    this.resolver = this.createGetProfile();
  }
  public createGetProfile() {
    return this.api
      .addDynamoDbDataSource("GetProfileQuery", this.usersTable)
      .createResolver({
        typeName: "Query",
        fieldName: "getProfile",
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            "../resolvers/query/getProfile/request.vtl"
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            "../resolvers/query/getProfile/response.vtl"
          )
        ),
      });
  }
}
