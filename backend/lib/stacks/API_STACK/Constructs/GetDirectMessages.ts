import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class GetDirectMessages extends Construct {
  public api: appsync.GraphqlApi;
  public directMessagesTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    directMessagesTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.directMessagesTable = directMessagesTable;
    this.resolver = this.createGetDirectMessages();
  }
  public createGetDirectMessages() {
    return this.api
      .addDynamoDbDataSource('GetDirectMessagesQuery', this.directMessagesTable)
      .createResolver({
        typeName: 'Query',
        fieldName: 'getDirectMessages',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/GetDirectMessages/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/GetDirectMessages/response.vtl'
          )
        )
      });
  }
}
