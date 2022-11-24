import * as cdk from "aws-cdk-lib";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";
import * as path from "path";
export class EditMyProfile extends Construct {
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
    this.resolver = this.createEditMyProfile();
  }
  public createEditMyProfile() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource("UsersTableEditMyProfile", this.usersTable)
      .createResolver({
        typeName: "Mutation",
        fieldName: "editMyProfile",
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            "../resolvers/mutations/EditMyProfile/request.vtl"
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            "../resolvers/mutations/EditMyProfile/response.vtl"
          )
        ),
      });
  }
}
