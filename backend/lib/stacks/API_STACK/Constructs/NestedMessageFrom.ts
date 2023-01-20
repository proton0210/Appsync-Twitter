import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class MessageFrom extends Construct {
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
    this.resolver = this.createMessageFromResolver();
  }

  public createMessageFromResolver() {
    return this.api
      .addDynamoDbDataSource('MessageFromUsers', this.usersTable)
      .createResolver({
        typeName: 'Message',
        fieldName: 'from',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/MessageFrom/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/MessageFrom/response.vtl'
          )
        )
      });
  }
}
