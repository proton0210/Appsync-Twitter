import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class Like extends Construct {
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
    this.resolver = this.createLike();
  }
  public createLike() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource('likesTable', this.likesTable)
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'like',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/Like/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/Like/response.vtl')
        )
      });
  }
}
