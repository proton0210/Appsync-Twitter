import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedLiked extends Construct {
  public api: appsync.GraphqlApi;
  public likesTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;

  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    likesTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.likesTable = likesTable;
    this.resolver = this.createNestedLikedResolver();
  }

  public createNestedLikedResolver() {
    return this.api
      .addDynamoDbDataSource('nestedLikesTable', this.likesTable)
      .createResolver({
        typeName: 'Tweet',
        fieldName: 'liked',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/Nested/Liked/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/Nested/Liked/response.vtl')
        )
      });
  }
}
