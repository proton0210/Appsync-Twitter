import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedInReplyToUsers extends Construct {
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
    this.resolver = this.createNestedInReplyToUsersResolver();
  }

  public createNestedInReplyToUsersResolver() {
    return this.api
      .addDynamoDbDataSource('NestedInReplyToUsersDataSource', this.usersTable)
      .createResolver({
        typeName: 'Reply',
        fieldName: 'inReplyToUsers',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/InReplyToUsers/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/InReplyToUsers/response.vtl'
          )
        )
      });
  }
}
