import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class ListConversations extends Construct {
  public api: appsync.GraphqlApi;
  public conversationsTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    conversationsTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.conversationsTable = conversationsTable;
    this.resolver = this.createListConversations();
  }
  public createListConversations() {
    return this.api
      .addDynamoDbDataSource('ListConversationsQuery', this.conversationsTable)
      .createResolver({
        typeName: 'Query',
        fieldName: 'listConversations',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/ListConversations/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/ListConversations/response.vtl'
          )
        )
      });
  }
}
