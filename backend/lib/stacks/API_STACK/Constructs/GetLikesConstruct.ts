import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class GetLikes extends Construct {
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
    this.resolver = this.createGetLikes();
  }
  public createGetLikes() {
    return this.api
      .addDynamoDbDataSource('likesTableForGetLikesQuery', this.likesTable)
      .createResolver({
        typeName: 'Query',
        fieldName: 'getLikes',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/getLikes/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/getLikes/response.vtl')
        )
      });
  }
}
