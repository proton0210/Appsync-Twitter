import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedProfileTweet extends Construct {
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
    this.resolver = this.createNestedProfileTweetResolver();
  }

  public createNestedProfileTweetResolver() {
    return this.api
      .addDynamoDbDataSource(
        'usersTableNestedProfileTweetQuery',
        this.usersTable
      )
      .createResolver({
        typeName: 'Tweet',
        fieldName: 'profile',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/Nested/Tweet/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/Nested/Tweet/response.vtl')
        )
      });
  }
}
