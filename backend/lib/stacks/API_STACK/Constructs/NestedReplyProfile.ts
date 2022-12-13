import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedReplyProfile extends Construct {
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
    this.resolver = this.createNestedReplyProfileResolver();
  }

  public createNestedReplyProfileResolver() {
    return this.api
      .addDynamoDbDataSource('NestedReplyProfileDataSource', this.usersTable)
      .createResolver({
        typeName: 'Reply',
        fieldName: 'profile',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/ReplyProfile/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/ReplyProfile/response.vtl'
          )
        )
      });
  }
}
