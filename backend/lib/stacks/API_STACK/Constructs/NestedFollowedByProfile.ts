import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedFollowedByOtherProfile extends Construct {
  public api: appsync.GraphqlApi;
  public relationShipsTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;

  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    relationShipsTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.relationShipsTable = relationShipsTable;
    this.resolver = this.createNestedFollowedByOtherProfileResolver();
  }

  public createNestedFollowedByOtherProfileResolver() {
    return this.api
      .addDynamoDbDataSource(
        'NestedFollowedByOtherProfileDataSource',
        this.relationShipsTable
      )
      .createResolver({
        typeName: 'OtherProfile',
        fieldName: 'followedBy',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/FollowedByOtherProfile/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/FollowedByOtherProfile/response.vtl'
          )
        )
      });
  }
}
